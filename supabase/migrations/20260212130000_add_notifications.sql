/*
  # Notifications System
  # Migration: 20260212130000_add_notifications.sql

  Creates notifications system for in-app and email alerts:
  - Notifications table for storing all notifications
  - User preferences for notification settings
  - Triggers and functions for automated notifications
*/

-- =====================================================
-- 1. CREATE NOTIFICATIONS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  -- Notification content
  type text NOT NULL, -- 'invoice_overdue', 'task_due', 'task_overdue', 'follow_up', etc.
  title text NOT NULL,
  message text NOT NULL,
  priority text DEFAULT 'medium', -- 'low', 'medium', 'high'

  -- Related entity (optional)
  related_id uuid,
  related_type text, -- 'invoice', 'task', 'contact', 'project'
  action_url text, -- Where to navigate when clicked

  -- Status
  read_at timestamptz,
  archived_at timestamptz,

  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON notifications(user_id);
CREATE INDEX IF NOT EXISTS notifications_tenant_id_idx ON notifications(tenant_id);
CREATE INDEX IF NOT EXISTS notifications_created_at_idx ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS notifications_read_at_idx ON notifications(read_at) WHERE read_at IS NULL;
CREATE INDEX IF NOT EXISTS notifications_type_idx ON notifications(type);

-- =====================================================
-- 2. CREATE USER NOTIFICATION PREFERENCES
-- =====================================================

CREATE TABLE IF NOT EXISTS notification_preferences (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,

  -- In-app notification preferences
  enable_in_app boolean DEFAULT true,

  -- Email notification preferences
  enable_email boolean DEFAULT true,
  email_frequency text DEFAULT 'instant', -- 'instant', 'daily', 'weekly', 'never'

  -- Specific notification types (can be expanded)
  notify_invoice_overdue boolean DEFAULT true,
  notify_task_due boolean DEFAULT true,
  notify_task_overdue boolean DEFAULT true,
  notify_follow_up boolean DEFAULT true,

  -- Quiet hours (optional)
  quiet_hours_start time,
  quiet_hours_end time,

  -- Weekly summary
  weekly_summary_enabled boolean DEFAULT true,
  weekly_summary_day integer DEFAULT 1, -- 1 = Monday

  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

-- Index
CREATE INDEX IF NOT EXISTS notification_preferences_user_id_idx ON notification_preferences(user_id);

-- =====================================================
-- 3. RLS POLICIES
-- =====================================================

-- Users can only see their own notifications
CREATE POLICY "Users view their own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

-- Users can create notifications (for manual triggers)
CREATE POLICY "Users create notifications" ON notifications
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users update their own notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

-- Users can delete their own notifications
CREATE POLICY "Users delete their own notifications" ON notifications
  FOR DELETE USING (user_id = auth.uid());

-- Users can view/update their own preferences
CREATE POLICY "Users view their own preferences" ON notification_preferences
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users update their own preferences" ON notification_preferences
  FOR ALL USING (user_id = auth.uid());

-- =====================================================
-- 4. HELPER FUNCTIONS
-- =====================================================

-- Function to create a notification
CREATE OR REPLACE FUNCTION create_notification(
  p_tenant_id uuid,
  p_user_id uuid,
  p_type text,
  p_title text,
  p_message text,
  p_priority text DEFAULT 'medium',
  p_related_id uuid DEFAULT NULL,
  p_related_type text DEFAULT NULL,
  p_action_url text DEFAULT NULL
)
RETURNS uuid AS $$
DECLARE
  v_notification_id uuid;
BEGIN
  INSERT INTO notifications (
    tenant_id,
    user_id,
    type,
    title,
    message,
    priority,
    related_id,
    related_type,
    action_url
  ) VALUES (
    p_tenant_id,
    p_user_id,
    p_type,
    p_title,
    p_message,
    p_priority,
    p_related_id,
    p_related_type,
    p_action_url
  )
  RETURNING id INTO v_notification_id;

  RETURN v_notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark notification as read
CREATE OR REPLACE FUNCTION mark_notification_read(p_notification_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE notifications
  SET read_at = now()
  WHERE id = p_notification_id
    AND user_id = auth.uid()
    AND read_at IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark all notifications as read
CREATE OR REPLACE FUNCTION mark_all_notifications_read(p_user_id uuid)
RETURNS integer AS $$
DECLARE
  v_count integer;
BEGIN
  UPDATE notifications
  SET read_at = now()
  WHERE user_id = p_user_id
    AND read_at IS NULL;

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get unread notification count
CREATE OR REPLACE FUNCTION get_unread_count(p_user_id uuid)
RETURNS integer AS $$
DECLARE
  v_count integer;
BEGIN
  SELECT COUNT(*)
  INTO v_count
  FROM notifications
  WHERE user_id = p_user_id
    AND read_at IS NULL
    AND archived_at IS NULL;

  RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 5. TRIGGERS
-- =====================================================

-- Update updated_at timestamp
CREATE TRIGGER update_notifications_updated_at
  BEFORE UPDATE ON notifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_notification_preferences_updated_at
  BEFORE UPDATE ON notification_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================================================
-- 6. DEFAULT PREFERENCES
-- =====================================================

-- Function to create default preferences for new users
CREATE OR REPLACE FUNCTION create_default_notification_preferences()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notification_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create preferences for new users
CREATE TRIGGER on_user_created_notification_preferences
  AFTER INSERT ON profiles
  FOR EACH ROW EXECUTE FUNCTION create_default_notification_preferences();

-- =====================================================
-- 7. COMMENTS
-- =====================================================

COMMENT ON TABLE notifications IS 'Stores all user notifications (in-app and email)';
COMMENT ON COLUMN notifications.type IS 'Type of notification: invoice_overdue, task_due, etc.';
COMMENT ON COLUMN notifications.priority IS 'Priority level: low, medium, high';
COMMENT ON COLUMN notifications.read_at IS 'When the notification was read';
COMMENT ON COLUMN notifications.action_url IS 'URL to navigate to when notification is clicked';

COMMENT ON TABLE notification_preferences IS 'User preferences for notifications';
COMMENT ON COLUMN notification_preferences.email_frequency IS 'How often to send email notifications: instant, daily, weekly, never';

/*
  Notification Types:
  - invoice_overdue: Invoice past due date
  - task_due_soon: Task due within 24 hours
  - task_overdue: Task past due date
  - follow_up_reminder: Contact inactive for X days
  - weekly_summary: Weekly digest email
*/
