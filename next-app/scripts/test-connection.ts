import { Client } from 'pg'

const directUrl = 'postgresql://postgres:ZFft++vAp.B&$53@db.udczwafhjuewnzvrcvdq.supabase.co:5432/postgres'
const poolerUrl = 'postgresql://postgres.udczwafhjuewnzvrcvdq:ZFft++vAp.B&$53@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres'

async function testConnection(url, name) {
  console.log(`\n测试 ${name}...`)
  const client = new Client({ connectionString: url })

  try {
    await client.connect()
    console.log(`✅ ${name} 连接成功!`)

    const result = await client.query('SELECT NOW()')
    console.log(`服务器时间: ${result.rows[0].now}`)

    await client.end()
    return true
  } catch (error) {
    console.error(`❌ ${name} 连接失败:`, error.message)
    return false
  }
}

async function main() {
  console.log('=== Supabase 连接测试 ===')

  const directOk = await testConnection(directUrl, 'Direct (5432)')
  const poolerOk = await testConnection(poolerUrl, 'Pooler (6543)')

  console.log('\n=== 结果 ===')
  console.log(`Direct (5432): ${directOk ? '✅' : '❌'}`)
  console.log(`Pooler (6543): ${poolerOk ? '✅' : '❌'}`)

  if (!directOk && !poolerOk) {
    console.log('\n⚠️  两个连接都失败了。可能原因:')
    console.log('1. Supabase 项目已暂停 (检查 Dashboard)')
    console.log('2. 密码错误')
    console.log('3. 网络问题')
  }
}

main()
