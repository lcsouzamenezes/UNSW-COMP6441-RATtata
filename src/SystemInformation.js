const si = require('systeminformation')

async function run () {
  //   console.log(await si.cpuCurrentspeed().then(d => d.avg))
  // console.log(await si.cpu())// .then(d => d.speed))

  const osInfo = await si.osInfo()
  console.log('Platform:', osInfo.platform)
  console.log('Distro:', osInfo.distro)

  console.log('Kernel:', osInfo.kernel)
  console.log('Hostname:', osInfo.hostname)
  console.log('Logo File:', osInfo.logofile)

  //   logofile || platform

  const users = await si.users()

  const hasMonitor = (await si.graphics()).displays !== []
  console.log('Has Monitor:', hasMonitor)

  const networkInterfaces = await si.networkInterfaces()
  const lanIPs = networkInterfaces
    .map(d => d.ip4)
    .filter(d => d && d !== '127.0.0.1')
  //   console.log(networkInterfaces.map(d => d.ip6).filter(d => d && d !== '::1'))
  console.log('LAN IPs:', lanIPs)

  const memory = await si.mem()
  const memoryPercentage = (memory.used / memory.total) * 100
  console.log('Memory Usage:', memoryPercentage.toFixed(0) + '%')

  const memoryUnitMap = ['B', 'KB', 'MB', 'GB', 'TB']
  const memoryUnitIndex = parseInt(memory.total.toString().length / 3)
  const memoryUnitMultiplier = Math.pow(1024, memoryUnitIndex)
  console.log(
    `${(memory.used / memoryUnitMultiplier).toFixed(1)} / ${(
      memory.total / memoryUnitMultiplier
    ).toFixed(1)} ${memoryUnitMap[memoryUnitIndex]}`
  )
}

run()
