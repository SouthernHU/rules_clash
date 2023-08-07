## 规则说明

本规则结合科研狗的日常需求，并针对XJTU校内规则进行优化。同时针对当下火热的ChatGPT和newBing工具进行规则补充。分流规则如下：

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

## 使用方法
### Clash安装
使用 [Clash](https://github.com/Dreamacro/clash) 作为代理工具，此工具支持 SS/SSR/V2Ray/Trojan/HTTP/HTTPS/SOCKS 等多种协议。不同平台的客户端如下：
  + Windows: [Clash for Windows](https://github.com/Fndroid/clash_for_windows_pkg/releases)
  + Mac: [ClashX](https://github.com/yichengchen/clashX/releases)（推荐） 或 [Clash for Windows](https://github.com/Fndroid/clash_for_windows_pkg/releases)
  + Android/HarmonyOS: [Clash for Android](https://github.com/Kr328/ClashForAndroid/releases)

### 转换订阅链接
目的：需要将机场提供的订阅链接按照本项目规则处理后重新生成clash订阅链接
工具：不放心安全性可以使用 [subconverter](https://github.com/tindy2013/subconverter)。subconverter自行搭建服务，一般用户推荐直接使用[ACL4SSR在线订阅转换工具](https://acl4ssr-sub.github.io/)
步骤：
+ 打开[ACL4SSR在线订阅转换工具](https://acl4ssr-sub.github.io/)
+ 粘贴机场提供的订阅链接 ，点击生成订阅链接即可生成转换后的订阅链接
+ 在 Clash 客户端中添加上一步得到的链接。以 Windows 版为例，点击 Profiles，将链接粘贴到上方的框中，点击 Download 按钮
+ 推荐设置为每小时更新一次，在配置上右键 - Settings，设置 Update Interval (hour) 为 1
