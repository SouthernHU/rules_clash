// 国内DNS服务器
const domesticNameservers = [
  "https://dns.alidns.com/dns-query", // 阿里云公共DNS
  "https://doh.pub/dns-query", // 腾讯DNSPod
  "https://doh.360.cn/dns-query", // 360安全DNS
];
// 国外DNS服务器
const foreignNameservers = [
  "https://1.1.1.1/dns-query", // Cloudflare(主)
  "https://1.0.0.1/dns-query", // Cloudflare(备)
  "https://208.67.222.222/dns-query", // OpenDNS(主)
  "https://208.67.220.220/dns-query", // OpenDNS(备)
  "https://194.242.2.2/dns-query", // Mullvad(主)
  "https://194.242.2.3/dns-query", // Mullvad(备)
];
// DNS配置
const dnsConfig = {
  dns: true,
  listen: 1053,
  ipv6: true,
  "use-hosts": true,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    "+.lan",
    "+.local",
    "+.msftconnecttest.com",
    "+.msftncsi.com",
  ],
  "default-nameserver": ["223.5.5.5", "114.114.114.114", "1.1.1.1", "8.8.8.8"],
  nameserver: [...domesticNameservers, ...foreignNameservers],
  "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
  "nameserver-policy": {
    "geosite:private,cn,geolocation-cn": domesticNameservers,
    "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers,
  },
};
// 规则集通用配置
const ruleProviderCommon = {
  type: "http",
  format: "yaml",
  interval: 1800, //半小时更新一次规则
};
// 规则集配置
const ruleProviders = {
  academic: {
    ...ruleProviderCommon,
    behavior: "domain",
    format: "text",
    url: "https://raw.githubusercontent.com/SouthernHU/rules_clash/refs/heads/main/domainFormat/academic.txt",
    path: "./rulesets/southernhu/academic.txt",
  },
  ChinaDomainLite: {
    ...ruleProviderCommon,
    behavior: "domain",
    format: "text",
    url: "https://raw.githubusercontent.com/SouthernHU/rules_clash/refs/heads/main/domainFormat/ChinaDomainLite.txt",
    path: "./rulesets/southernhu/ChinaDomainLite.txt",
  },
  overseasLite: {
    ...ruleProviderCommon,
    behavior: "domain",
    format: "text",
    url: "https://raw.githubusercontent.com/SouthernHU/rules_clash/refs/heads/main/domainFormat/overseasLite.txt",
    path: "./rulesets/southernhu/overseasLite.txt",
  },
  GPTs: {
    ...ruleProviderCommon,
    behavior: "domain",
    format: "text",
    url: "https://raw.githubusercontent.com/SouthernHU/rules_clash/refs/heads/main/domainFormat/GPTs.txt",
    path: "./rulesets/southernhu/GPTs.txt",
  },
  overseasMedia: {
    ...ruleProviderCommon,
    behavior: "domain",
    format: "text",
    url: "https://raw.githubusercontent.com/SouthernHU/rules_clash/refs/heads/main/domainFormat/overseaMedia.txt",
    path: "./rulesets/southernhu/overseasMedia.txt",
  },
  ADBlocking: {
    ...ruleProviderCommon,
    behavior: "domain",
    format: "yaml",
    url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/reject.txt",
    path: "./rulesets/southernhu/ADBlocking.txt",
  },
  overSeaFull_ACL4SSR: {
    ...ruleProviderCommon,
    behavior: "domain",
    format: "yaml",
    url: "https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/proxy.txt",
    path: "./rulesets/southernhu/proxy.yaml",
  },
  GFWPatch: {
    ...ruleProviderCommon,
    behavior: "domain",
    format: "text",
    url: "https://raw.githubusercontent.com/SouthernHU/rules_clash/refs/heads/main/domainFormat/GFWPatch.txt",
    path: "./rulesets/southernhu/GFWPatch.txt",
  },



};
// 规则
const rules = [
  // 其他规则
  "GEOIP,LAN,DIRECT,no-resolve",
  "GEOIP,CN,DIRECT,no-resolve",
  //自定义规则
  "RULE-SET,academic,学术网站",
  "RULE-SET,ChinaDomainLite,国内常用",
  "RULE-SET,GPTs,GPTs",
  "RULE-SET,overseasLite,海外常用",
  "RULE-SET,GFWPatch,海外常用",
  "RULE-SET,overseasMedia,海外流媒体",
  "RULE-SET,overSeaFull_ACL4SSR,海外完整",
  "RULE-SET,ADBlocking,全局拦截",

];
// 代理组通用配置
const groupBaseOption = {
  interval: 10,
  timeout: 3000,
  url: "https://www.google.com/generate_204",
  lazy: true,
  "max-failed-times": 3,
  hidden: false,
};

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object"
      ? Object.keys(config["proxy-providers"]).length
      : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }
  // GPT区域
  const gptRegion = "(US|🇺🇸|美国|SG|🇸🇬|新加坡|KR|🇰🇷|韩国|AU|澳大利亚|TW|🇹🇼|台湾|日本|🇯🇵|JP|德国|🇩🇪|DE)(?!.*(0\.1x|x0\.1))";
  // 速度筛选
  const fastFillter = "x3|x2|2x|3x|1.5x|x1.5";
  // 覆盖原配置中DNS配置
  config["dns"] = dnsConfig;

  // 覆盖原配置中的代理组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      name: "学术网站",
      type: "select",
      proxies: ["DIRECT"],
      "include-all": false,
      icon: "https://raw.githubusercontent.com/shindgewongxj/WHATSINStash/refs/heads/main/icon/applebooks.png",
    },

    {
      ...groupBaseOption,
      // 支持的国家中选择延迟最低的，并排除低倍速率节点
      name: "GPTs",
      "type": "url-test",
      "tolerance": 100,  // 延迟容忍度，超过150ms的节点将被淘汰
      "fallback": 10,  // 备用节点数量，保留延迟最低的10个节点
      "interval": 5,  // 每5秒测速一次
      // 美国|新加坡|韩国|澳大利亚|台湾|日本|德国
      "filter": gptRegion,
      "include-all": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg",
    },
    {
      ...groupBaseOption,
      name: "国内常用",
      type: "select",
      proxies: ["DIRECT"],
      "include-all": false,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/cn.svg",
    },
    {
      ...groupBaseOption,
      // 高速节点中选择延迟最低的
      name: "海外常用",
      "type": "url-test",
      "tolerance": 100,  // 延迟容忍度，超过150ms的节点将被淘汰
      "fallback": 10,  // 备用节点数量，保留延迟最低的10个节点
      "interval": 5,  // 每300秒测速一次
      "filter": fastFillter, // 匹配高速节点
      "include-all": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg",
    },
    {
      ...groupBaseOption,
      // 高速节点中进行负载均衡
      name: "海外流媒体",
      type: "load-balance",
      strategy: "consistent-hashing",
      "include-all": true,
      "filter": fastFillter, // 匹配高速节点
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg",
    },
    {
      ...groupBaseOption,
      // 高速节点中进行负载均衡
      name: "海外完整",
      type: "load-balance",
      strategy: "consistent-hashing",
      "filter": fastFillter, // 匹配高速节点
      "include-all": true,
      icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/World_Map.png",
    },
    {
      ...groupBaseOption,
      name: "全局拦截",
      type: "select",
      proxies: ["REJECT", "DIRECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg",
    },
    {
      ...groupBaseOption,
      name: "节点选择",
      "type": "url-test",
      proxies: ["负载均衡(散列)","延迟选优","负载均衡(轮询)","故障转移"],
      "include-all": true,
      url: "http://www.gstatic.com/generate_204",
      interval: 5,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
    },
    {
      ...groupBaseOption,
      name: "延迟选优",
      type: "url-test",
      tolerance: 100,
      "hidden": true,
      "include-all": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg",
    },
    {
      ...groupBaseOption,
      name: "故障转移",
      type: "fallback",
      "include-all": true,
      "hidden": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg",
    },
    {
      ...groupBaseOption,
      name: "负载均衡(散列)",
      type: "load-balance",
      strategy: "consistent-hashing",
      "include-all": true,
      "hidden": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg",
    },
    {
      ...groupBaseOption,
      name: "负载均衡(轮询)",
      type: "load-balance",
      strategy: "round-robin",
      "include-all": true,
      "hidden": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg",
    },
  ];

  // 覆盖原配置中的规则
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;

  // 返回修改后的配置
  return config;
}
