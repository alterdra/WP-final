# WP-final
111年背單字軟體  

Localhost 安裝與使用
* 使用前步驟：
    1. 安裝：在WP-final下輸入``` yarn install:all ```
    2. 運行前端：```yarn start```
    3. 運行後端：```yarn server```
    4. 將前後端運行後，在 http://localhost:3000 下為app主頁，點選右上角註冊帳號按鍵，輸入帳號密碼後，以此帳密在右上角登入
* 功能：
點選左方sidebar三個按鍵，分別會前往三個分頁，如下：
    1. 單字區
        * 初始匯入兩組學習集 - 飲食、服裝
        * 新增、刪除學習集(按右上方的x)
        * 點選學習集中間圖樣，進入該學習集
        * 學習集功能
            * 新增、刪除單字卡(按右上方的x)
            * 點選字卡：
                * 切換並排顯示、單張顯示 
                * 在兩種模式下，均能標記已學會的單字卡
            * 切換顯示學過、未學過單字卡
    2. 考試區
        * 可選擇學習集、考試題數及考試題型，點選確定前往考試頁
        * 考試頁
            * 選擇題
            * 填充題
            * 可於上下題隨意切換，答案會保留住
            * 考完計算分數，並新增至考試紀錄
            * 點選再考一次或回到主頁
        * 考試歷史紀錄顯示、刪除
    3. 主頁
        * 祈福卡(今日的運勢)，點選翻面
        * 相簿切換(定時或手動)
        * 春聯切換(定時)
        * 點選下方中央contact us，以連繫我們  
