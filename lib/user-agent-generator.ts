/**
 * User-Agent 随机生成器
 * 用于模拟各种真实的浏览器和设备
 */

// 随机选择数组中的元素
function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 生成随机版本号
function randomVersion(min: number, max: number): string {
  const major = Math.floor(Math.random() * (max - min + 1)) + min;
  const minor = Math.floor(Math.random() * 10);
  const patch = Math.floor(Math.random() * 10);
  return `${major}_${minor}_${patch}`;
}

// 生成随机数字版本
function randomNumVersion(min: number, max: number): string {
  const major = Math.floor(Math.random() * (max - min + 1)) + min;
  const minor = Math.floor(Math.random() * 100);
  const patch = Math.floor(Math.random() * 10000);
  return `${major}.${minor}.${patch}`;
}

/**
 * 生成 iPhone 微信浏览器 User-Agent
 */
function generateiPhoneWechat(): string {
  const iosVersion = randomVersion(13, 18);
  const webkitVersion = randomChoice(['605.1.15', '604.1.38', '605.2.17']);
  const wechatVersion = randomChoice(['8.0.50', '8.0.54', '8.0.64', '8.0.70', '8.0.75']);
  const netType = randomChoice(['WIFI', '4G', '5G']);
  
  return `Mozilla/5.0 (iPhone; CPU iPhone OS ${iosVersion} like Mac OS X) AppleWebKit/${webkitVersion} (KHTML, like Gecko) Mobile/15E148 MicroMessenger/${wechatVersion}(0x18004029) NetType/${netType} Language/zh_CN`;
}

/**
 * 生成 Android 微信浏览器 User-Agent
 */
function generateAndroidWechat(): string {
  const androidVersion = Math.floor(Math.random() * 7) + 8; // Android 8-14
  const wechatVersion = randomChoice(['8.0.50', '8.0.54', '8.0.64', '8.0.70', '8.0.75']);
  const netType = randomChoice(['WIFI', '4G', '5G']);
  const device = randomChoice([
    'HUAWEI VOG-AL00',
    'HUAWEI P30',
    'Xiaomi MI 11',
    'OPPO R15',
    'vivo X60',
    'Samsung SM-G9980'
  ]);
  
  return `Mozilla/5.0 (Linux; Android ${androidVersion}; ${device} Build/HUAWEIVOG-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 Mobile Safari/537.36 MicroMessenger/${wechatVersion} NetType/${netType} Language/zh_CN`;
}

/**
 * 生成 iPhone Safari User-Agent
 */
function generateiPhoneSafari(): string {
  const iosVersion = randomVersion(13, 18);
  const webkitVersion = randomChoice(['605.1.15', '604.1.38', '605.2.17']);
  const safariVersion = randomChoice(['604.1', '605.1.15', '537.36']);
  
  return `Mozilla/5.0 (iPhone; CPU iPhone OS ${iosVersion} like Mac OS X) AppleWebKit/${webkitVersion} (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/${safariVersion}`;
}

/**
 * 生成 Android Chrome User-Agent
 */
function generateAndroidChrome(): string {
  const androidVersion = Math.floor(Math.random() * 7) + 8;
  const chromeVersion = Math.floor(Math.random() * 30) + 90; // Chrome 90-119
  const device = randomChoice([
    'Pixel 6',
    'SM-G991B',
    'SM-A525F',
    'Redmi Note 11',
    'ONEPLUS A6000'
  ]);
  
  return `Mozilla/5.0 (Linux; Android ${androidVersion}; ${device}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion}.0.0.0 Mobile Safari/537.36`;
}

/**
 * 生成 Windows Chrome User-Agent
 */
function generateWindowsChrome(): string {
  const chromeVersion = Math.floor(Math.random() * 30) + 90;
  const windowsVersion = randomChoice(['Windows NT 10.0', 'Windows NT 11.0']);
  const arch = randomChoice(['Win64; x64', 'WOW64']);
  
  return `Mozilla/5.0 (${windowsVersion}; ${arch}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion}.0.0.0 Safari/537.36`;
}

/**
 * 生成 Mac Safari User-Agent
 */
function generateMacSafari(): string {
  const macVersion = randomChoice(['10_15_7', '11_6_8', '12_6_9', '13_5_2', '14_0']);
  const webkitVersion = randomChoice(['605.1.15', '604.1.38', '537.36']);
  const safariVersion = randomChoice(['605.1.15', '604.1', '537.36']);
  
  return `Mozilla/5.0 (Macintosh; Intel Mac OS X ${macVersion}) AppleWebKit/${webkitVersion} (KHTML, like Gecko) Version/16.0 Safari/${safariVersion}`;
}

/**
 * 生成 Mac Chrome User-Agent
 */
function generateMacChrome(): string {
  const chromeVersion = Math.floor(Math.random() * 30) + 90;
  const macVersion = randomChoice(['10_15_7', '11_6_8', '12_6_9', '13_5_2', '14_0']);
  
  return `Mozilla/5.0 (Macintosh; Intel Mac OS X ${macVersion}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion}.0.0.0 Safari/537.36`;
}

/**
 * 生成 Windows Edge User-Agent
 */
function generateWindowsEdge(): string {
  const edgeVersion = Math.floor(Math.random() * 30) + 90;
  const windowsVersion = randomChoice(['Windows NT 10.0', 'Windows NT 11.0']);
  
  return `Mozilla/5.0 (${windowsVersion}; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${edgeVersion}.0.0.0 Safari/537.36 Edg/${edgeVersion}.0.0.0`;
}

/**
 * 生成 iPad User-Agent
 */
function generateiPad(): string {
  const iosVersion = randomVersion(13, 17);
  const webkitVersion = randomChoice(['605.1.15', '604.1.38']);
  
  return `Mozilla/5.0 (iPad; CPU OS ${iosVersion} like Mac OS X) AppleWebKit/${webkitVersion} (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1`;
}

/**
 * 生成 Firefox User-Agent
 */
function generateFirefox(): string {
  const firefoxVersion = Math.floor(Math.random() * 30) + 90;
  const platform = randomChoice([
    'Windows NT 10.0; Win64; x64',
    'Macintosh; Intel Mac OS X 10.15',
    'X11; Linux x86_64'
  ]);
  
  return `Mozilla/5.0 (${platform}; rv:${firefoxVersion}.0) Gecko/20100101 Firefox/${firefoxVersion}.0`;
}

/**
 * User-Agent 生成器映射
 */
const generators = [
  { name: 'iPhone-Wechat', weight: 35, generator: generateiPhoneWechat },
  { name: 'Android-Wechat', weight: 30, generator: generateAndroidWechat },
  { name: 'iPhone-Safari', weight: 15, generator: generateiPhoneSafari },
  { name: 'Android-Chrome', weight: 5, generator: generateAndroidChrome },
  { name: 'Windows-Chrome', weight: 5, generator: generateWindowsChrome },
  { name: 'Mac-Safari', weight: 4, generator: generateMacSafari },
  { name: 'Mac-Chrome', weight: 3, generator: generateMacChrome },
  { name: 'iPad', weight: 3, generator: generateiPad },
];

/**
 * 根据权重随机生成 User-Agent
 */
export function generateRandomUserAgent(): string {
  const totalWeight = generators.reduce((sum, g) => sum + g.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const gen of generators) {
    random -= gen.weight;
    if (random <= 0) {
      return gen.generator();
    }
  }
  
  // 默认返回 iPhone 微信
  return generateiPhoneWechat();
}

/**
 * 生成指定类型的 User-Agent
 */
export function generateUserAgent(type?: string): string {
  if (!type) {
    return generateRandomUserAgent();
  }
  
  const gen = generators.find(g => g.name === type);
  if (gen) {
    return gen.generator();
  }
  
  return generateRandomUserAgent();
}

/**
 * 获取所有可用的 User-Agent 类型
 */
export function getAvailableTypes(): string[] {
  return generators.map(g => g.name);
}

/**
 * 生成指定数量的不同 User-Agent
 */
export function generateMultipleUserAgents(count: number = 10): string[] {
  const userAgents: string[] = [];
  for (let i = 0; i < count; i++) {
    userAgents.push(generateRandomUserAgent());
  }
  return userAgents;
}

