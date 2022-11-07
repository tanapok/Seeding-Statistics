<h1 align="center">
<span style="font-size: 1.4rem">Seeding Statistics</span>
</h1>

保种统计是一个用于统计用户做种情况的脚本，可用于 NexusPHP 架构的 PT 站点。

脚本可以统计用户的做种数据，并根据站点进行分类汇总，详细展示用户做种详情。可以统计的数据包括站点名称、做种数量、做种体积、平均保种人数、做种上传总量、做种下载总量、平均做种时间等。

### 用户界面截图

![用户界面截图](https://user-images.githubusercontent.com/25226381/197413483-3ee84565-852d-477e-906b-a0c393851571.png "用户界面截图")

### 使用方法

先安装 [TamperMonkey](https://www.tampermonkey.net/) ，然后 [安装脚本](https://greasyfork.org/zh-CN/scripts/453598-%E4%BF%9D%E7%A7%8D%E7%BB%9F%E8%AE%A1) 并启用。启用脚本后，在脚本所支持站点的个人详情页，点击展开做种列表，脚本会自动运行并收集数据。你可以根据用户界面的提示进行操作。

你也可以在 [Releases 页面](https://github.com/tanapok/Seeding-Statistics/releases/tag/v1.0.4) 下载并手动安装脚本的最新版本。

如果你是新手用户，可以参考下面的[详细安装方法](#详细安装方法)。

### 支持的站点和小组

下方为脚本支持的站点及其小组列表。括号中注明未正式适配的，说明该脚本未在对应站点进行测试，脚本可能无法在对应的站点正常工作。

- WinterSakura：-SakuraWEB, -SakuraSUB, -WS, -WScode, -Sakura Academic
- CarPT：-CarPT
- HDVideo：-HDVWEB, -HDVMV, @HDVWEB, @HDVMV
- UltraHD：-UltraTV, -UltraHD, @UltraTV, @UltraHD
- QHstudIo（未正式适配）：-QHstudIo, @QHstudIo
- Audiences（未正式适配）：-Audies, @Audies, -ADE, @ADE, @ADWeb, -ADWeb, -ADAudio, -ADEBook, -ADMusic, @ADAudio, @ADEBook, @ADMusic
- CHDBits（未正式适配）：-CHDBits, -CHDTV, -CHDPAD, -CHDWEB, -CHDHKTV, -StBOX, -OneHD, @CHDBits, @CHDTV, @CHDPAD, @CHDWEB, @CHDHKTV, @StBOX, @OneHD
- HD Dolby（未正式适配）：-Dream, -DBTV, -HDo, @Dream, @DBTV, @HDo
- HDFans（未正式适配）：-HDFans, @HDFans
- HDSky（未正式适配）：-HDSky, -HDSWEB, -HDSTV, -HDSPad, -HDS, @HDSky, @HDSWEB, @HDSTV, @HDSPad, @HDS
- LemonHD（未正式适配）：-LHD, -LeagueHD, -LeagueNF, -LeagueTV, -LeagueCD, -LeagueWEB, -i18n, -CiNT, @LHD, @LeagueHD, @LeagueNF, @LeagueTV, @LeagueCD, @LeagueWEB, @i18n, @CiNT
- M-Team（未正式适配）：-MTeam, -MPAD, -tnp, @MTeam, @MPAD, @tnp
- OurBits（未正式适配）：-OurTV, -PbK, -MGs, -Ao, -OurBits, -FLTTH, -iLoveHD, -iLoveTV, -OuePad, @OurTV, @PbK, @MGs, @Ao, @OurBits, @FLTTH, @iLoveHD, @iLoveTV, @OuePad
- PTerClub（未正式适配）：-PTer, -PTerWEB, -PTerMV, -PTerTV, @PTer, @PTerWEB, @PTerMV, @PTerTV
- SSD（未正式适配）：-CMCT, -CMCTV, @CMCT, @CMCTV
- TTG（未正式适配）：-TTG, -Wiki, -NGB, -DoA, @TTG, @Wiki, @NGB, @DoA
- TJUPT（未正式适配）：-TJUPT, @TJUPT
- PTSBAO（未正式适配）：-OPS, -FFansBD, -FFansWEB, -FFansTV, -FFansDVD, -FHDMv, @OPS, @FFansBD, @FFansWEB, @FFansTV, @FFansDVD, @FHDMv
- Hares（未正式适配）：-Hares, -HaresWEB, -HaresTV, @Hares, @HaresWEB, @HaresTV
- HDChina（未正式适配）：-HDCTV, -HDChina, @HDCTV, @HDChina
- HDHome（未正式适配）：-HDH, -HDHome, -HDHWEB, -HDHTV, -HDHPad, @HDH, @HDHome, @HDHWEB, @HDHTV, @HDHPad
- PTHOME（未正式适配）：-PTH, -PTHome, -PTHweb, -PTHtv, -PTHeBook, -PTHAudio, -PTHmusic, @PTH, @PTHome, @PTHweb, @PTHtv, @PTHeBook, @PTHAudio, @PTHmusic
- BTSCHOOL（未正式适配）：-BtsHD, -BtsTV, -BtsPAD, -Zone, @BtsHD, @BtsTV, @BtsPAD, @Zone
- KeepFRDS（未正式适配）：-FRDS, @FRDS
- BeiTai（未正式适配）：-BeiTai, @BeiTai
- HD4FANS（beAst）（未正式适配）：-beAst, @beAst, -beAstTV, @beAstTV
- TLFbits（未正式适配）：-TLF, @TLF
- piggo（未正式适配）：-PiGoNF, @PiGoNF, -PigoHD, @PigoHD, -PigoWeb, @PigoWeb
- HHanClub（未正式适配）：-HHWEB, @HHWEB
- GainBound（未正式适配）：-DGB, @DGB, -GBWEB, @GBWEB
- PuTao（未正式适配）：-PuTao, @PuTao

### 引用的项目

- [JavaScript-MD5](https://github.com/blueimp/JavaScript-MD5)

### Bug 报告

你可以在 [Issues 页面](https://github.com/tanapok/Seeding-Statistics/issues) 直接提出 issue。

### 详细安装方法

此方法适合新手用户。使用此方法可以直接安装脚本的最新版本，且脚本可以自动更新。

**1. 在浏览器中安装 Tampermonkey 插件**

首先安装 Tampermonkey。如已安装请跳过此步。

Tampermonkey 是一个允许在网页中执行脚本的浏览器插件，同时具有脚本查找、管理等功能，适用于多款浏览器。你可以使用 Tampermonkey 加载脚本。

根据你使用的浏览器，在下方选择对应的版本，根据提示将 Tampermonkey 安装到浏览器上。

- [TamperMonkey (Firefox 插件)](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

- [TamperMonkey (Chrome 插件)](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)

- [TamperMonkey 其他版本](https://www.tampermonkey.net/)：将前往 Tampermonkey 官网，可根据提示选择需要的版本安装。


**2. 安装脚本**

在浏览器的新标签页中打开下方的 GreasyFork 链接，根据提示进行安装。

https://greasyfork.org/zh-CN/scripts/453598-%E4%BF%9D%E7%A7%8D%E7%BB%9F%E8%AE%A1

点击页面中的绿色按钮「安装此脚本」，在弹出的新窗口中点击「安装」按钮即可。

完成上述操作后，脚本应该已经安装并启用。

**3. 让脚本支持在隐私模式中运行（可选）**

注意，如果你需要在浏览器的隐私模式中使用脚本，需要在浏览器中设置允许 Tampermonkey 插件在隐私模式中执行，你可以参见下方链接进行相应设置。

- Firefox：https://support.mozilla.org/zh-CN/kb/%E9%9A%90%E7%A7%81%E6%B5%8F%E8%A7%88%E7%AA%97%E5%8F%A3%E4%B8%AD%E7%9A%84%E6%89%A9%E5%B1%95

- Chrome：https://support.google.com/chrome_webstore/answer/2664769?hl=zh-Hans#cke_bm_1361S