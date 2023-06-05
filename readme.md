# 规则说明

本规则结合科研狗的日常需求，并针对XJTU校内规则进行优化。同时针对当下火热的ChatGPT和newBing工具进行规则补充。流程如下：

| 文件                                                         | 默认 | 去广告 |
| ------------------------------------------------------------ | ---- | ------ |
| [ipAssigned.list](https://raw.githubusercontent.com/SouthernHU/rules_clash/main/ipAssigned.list) | 代理 |        |
| [onlybanAD.acl](https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Acl/onlybanAD.acl) | 代理 | 是     |
| [nobanAD.acl](https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Acl/nobanAD.acl) | 代理 | 否     |
| [backcn-banAD.acl](https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Acl/backcn-banAD.acl) | 代理 | 是     |
| [gfwlist-banAD.acl](https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Acl/gfwlist-banAD.acl) | 直连 | 是     |



1. 🖧  指定IP网站

   本规则存储在：ipAssigned.list。主要针对一些需要指定IP的网站如ChatGPT和newBing设置指定地区节点。

2. 🚩 国内常用

   本规则存储在：ChinaDomainLite.list。主要针对国内高频网站进行分流，减少进入CFW冗长判定的频率，加快分流速度。

3. 🎓 学术网站

   本规则存储在：academic.list。主要针对学术网站进行分流，避免校内IP识别不到导致数据库访问失败。

4. 🌍 海外常用

   本规则存储在：overseasLite.list。依据个人习惯存储少量高频次海外网站，加快分流速度。

5. 🎥 海外流媒体

   本规则存储在：overseasMedia.list。针对海外主流流媒体网站分流，便于指定节点从而更换地区。

6. ⛔ 全球拦截

   BanAD.list：使用ACL4SSR的去广告规则

   https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanAD.list

   BanEasyList.list：使用ACL4SSR的去广告规则

   https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanEasyList.list

7. 🎯 全球直连

   GEOIP,CN：中国域名直连

   UnBan.list：使用ACL4SSR的UnBan规则

   https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/UnBan.list

   ChinaDomain.list：使用ACL4SSR的ChinaDomain规则

   https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaDomain.list

8. 🌍 GFW列表

   ProxyGFWlist.list：直接使用ACL4SSR的CFW规则

   https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list

   GFWPatch.list：针对小众需求自己维护更新的域名列表

9. 🐟 漏网之鱼

