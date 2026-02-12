
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing environment variables')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function fixAdminProfile() {
    const email = 'admin@lopes2tech.ch'
    const demoOrgId = '11111111-1111-1111-1111-111111111111'

    console.log(`Fetching user ${email}...`)

    // 1. Get User ID from Auth
    // We can't select from auth.users directly with client unless using rpc or if allowed
    // But searching via admin api listUsers is better
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()

    if (listError) {
        console.error('Error listing users:', listError)
        return
    }

    const user = users.find(u => u.email === email)

    if (!user) {
        console.error('User not found')
        return
    }

    console.log(`Found user ${user.id}`)

    // 2. Update Profile
    console.log(`Updating profile for ${user.id} with org ${demoOrgId}...`)

    const { error: updateError } = await supabase
        .from('profiles')
        .update({
            tenant_id: demoOrgId,
            role: 'owner' // Ensure they are owner
        })
        .eq('id', user.id)

    if (updateError) {
        console.error('Error updating profile:', updateError)
    } else {
        console.log('Successfully updated profile!')
    }
}

fixAdminProfile()
