# h5-demo
mui结合5+ runtime 实现的各种5+例子

下面是文档：

[1.扫二维码Barcode](#Barcode)  
[2.相册或视频选取gallery](#gallery)  
[3.拍照或摄像Camera](#Camera)  
[4.系统通讯录Contacts](#Contacts)  
[5.音频录制和播放Audio](#Audio)  
[6.设备方向信息orientation](#orientation)  
[7.管理系统原生界面nativeUI](#nativeUI)  
[8.获取地理位置geolocation](#geolocation)
---
<h3 id="Barcode">扫二维码Barcode</h3>

### [详细文档](http://www.html5plus.org/doc/zh_cn/barcode.html)
#### 扫二维码有两种方式，第一种是`扫描框扫描，第二种是通过选取手机里的图片进行扫描
##### 第一种方式：有返回值
* 第一步：通过`new plus.barcode.Barcode( id, filters, styles )`来创建Barcode对象。有返回值，是一个对象，假如该对象为`obj`。
    * __id__：( String类型 )必选 表示扫描控件在页面中DOM节点的`id`值。
    * __filters__：（ 数组类型）可选 需要识别的条码类型，默认支持`QR、EAN13、EAN8`三种，类型设置越多，扫描效率越低
    * __styles__：（ json对象）可选 可定义扫描控件如扫描框或者扫描边线的颜色，有三个属性：
        * __frameColor__：(String 类型 )扫描边框颜色
        * __scanbarColor__：(String 类型 )扫描条颜色
        * __background__：(String 类型 )条码识别控件背景颜色
        * 如果颜色设置不生效，改用rgb格式试试
* 第二步：通过第一步获取到的`obj`对象来进行识别
    * `obj.start( options)`，开始调用摄像头进行扫描，当识别出条码数据时通过`onmarked`回调函数返回。
        * __options__：（一个json对象）可选 是条码识别的参数，有四个参数
            * __conserve__：是否保存成功扫描到的条码数据时的截图
            * __filename__：保存成功扫描到的条码数据时的图片路径可通过此参数设置保存截图的路径或名称
            * __vibrate__：成功扫描到条码数据时是否需要设备震动提醒。默认为`false`
            * __sound__：成功扫描到条码数据时播放的提示音类型。可取值：`none`-不播放提示音；`default` - 播放默认提示音（5+引擎内置）。 默认值为`default`。
    * `obj.cancel()`，结束对摄像头获取图片数据进行条码识别操作，同时关闭摄像头的视频捕获。 结束后可调用`start()`方法重新开始识别。相当于暂停。 
    * `obj.close()`;关闭扫描控件。注意要关闭最好在请求成功或者失败的函数里面关闭。 
    * `obj.setFlash( open )`;是否开启闪光灯
        * __open__：是否开启（必选），默认为`false`
    * `obj.onmarked = function(type,code,file){}`;扫描成功获取到数据时触发的事件
        * __type__：识别到的条码`类型`（必选）
        * __code__：识别到的条码`数据`（必选）
        * __file__：识别到的条码`图片文件路径`
    * `obj.onerror = function ( error ){}`;扫描失败触发的事件 
        * __error__：条码识别的错误信息。可通过`error.code`（Number类型）获取错误编码；可通过`error.message`（String类型）获取错误描述信息。

##### 第二种方式：无返回值
* 通过`plus.barcode.scan( path, successCB, errorCB, filters )`可获取条码码识别控件对象
    * __path__: ( String类型)必选 扫描的图片的地址，图片的地址必须是本地文件地址，如URLType类型（如以`_www`、`_doc`、`_documents`、`_downloads`开头的相对URL路径）或者系统绝对路径
    * __successCB__:  `function(type,code,file){}`必选 扫描条码码图片成功的回调函数，返回条码数据
    * __type__:( Number ) 必选 识别到的条码类型，与`Barcode`对象定义的条码类型常量一致
    * __code__: ( String ) 必选 识别到的条码数据，从条码图片中扫描出的数据内容，字符串采用UTF8编码格式
    * __file__: ( String ) 可选 识别到的条码图片文件路径。识别到的条码数据图片路径，图片为png格式；当设置为不保存图片，则返回undefined。 
    * __errorCB__: ( err ) 可选 扫描条码图片失败的回调函数，返回错误信息
        * __err__: 条码识别的错误信息,可通过`err.code`（Number类型）获取错误编码；可通过`err.message`（String类型）获取错误描述信息。
    
---

<h3 id="gallery">管理相册模块gallery</h3>

### [详细文档](http://www.html5plus.org/doc/zh_cn/gallery.html) 
#### 有两种方法，第一种是`pick`，从系统相册选择文件（图片或视频）。第二种是`save`，保存文件到系统相册中
##### 第一种方法`pick`：即选择，无返回值
* 通过`plus.gallery.pick( successCB, errorCB, option )`来创建选择图片或视频的方法
    * __succesCB__：（Function对象）必选，有两种方式：
        * 第一种方式是`单选图片`：`function(path){}`，`path`是单选图片或视频文件成功的回调函数，在选择文件操作成功时调用。
        * 第二种方式是`多选图片`：`function(e){}`，`e.files` 是保存多选的图片或视频文件路径,是一个数组
    * __errorCB__：（Function对象）可选，function(err){ }
        * 可通过`err.code`（Number类型）获取错误编码；可通过`err.message`（String类型）获取错误描述信息
    * __option__：（一个`json`对象）可选，有9个属性值
        * __animation__: (Boolean 类型 )是否显示系统相册文件选择界面的动画，默认为`true`
        * __filename__: (String 类型 )被选择文件的保存路径
        * __filter__: (String 类型 )在系统相册中选择文件的类型，默认为`image`，也可设置为`video`视频文件，`none`所有文件
        * __maximum__: (Number 类型 )最多选择的图片数量，范围为`1`至`Infinity`，仅在支持多选时有效，默认值为`Infinity`即不限制选择数量。
        * __multiple__: (Boolean 类型 ) 是否支持多选图片，默认为`false`
        * __onmaxed__:  (Function 类型 )超过设置的图片最大选择张数，触发此事件,`onmaxed=function(){}`
        * __popover__: （json对象）相册选择界面弹出指示区域，包含`top，left，width，height`属性
        * __selected__：（数组类型）已选图片路径列表，仅在图片多选时有效。
        * __system__: (Boolean 类型 ) 是否使用系统相册文件选择界面。默认为`true`。设置为`false`时，使用5+统一相册选择控件

##### 第二种方法`save`：即保存,无返回值
* 通过`plus.gallery.save( path, successCB, errorCB )`来保存文件到相册中
    * __path__：（ String类型 ）必选，是要保存到系统相册中的文件文件地址
    * __succesCB__：`function（e）{}`,必选，保存文件到系统相册中成功的回调函数
        * __e__: 必选 保存文件到系统相册成功事件对象,通过`e.file`获取保存到相册的图片路径,注意是__e.file__，并不是**e.path**，官网说的是**e.path**，但是实际真机调试返回的是__file__对象，我手机是小米6，不知道其它手机是否一样
    * __errorCB__:`function(err){}`,可选，保存文件到系统相册中失败的回调函数  
        * __err__:可通过`err.code`（Number类型）获取错误编码；可通过`err.message`（String类型）获取错误描述信息。

---
<h3 id="Camera">拍照或摄像Camera</h3>

### [详细文档](http://www.html5plus.org/doc/zh_cn/camera.html)
#### 通过`plus.camera.getCamera()`获取camera对象，有返回值
* 返回的对象假设为obj，obj有三个方法和四个可读属性
    * __方法1__：`captureImage( successCB, errorCB, option )`，进行拍照
    * __方法2__：`startVideoCapture(successCB, errorCB, option)`，调用摄像头
    * 以上两个方法都是通过 `obj.方法` 进行调用，对应属性值如下：
        * __successCB__：`function(cFile){}`，必选，调用摄像头操作成功的回调函数，用于返回图片或视频文件的路径即`cFile`
        * __errorCB__：`function（err）{}`，可选，调用摄像头操作失败的回调函数，可通过`err.code`（Number类型）获取错误编码； 可通过`err.message`（String类型）获取错误描述信息
        * __option__：（json对象）摄像头拍照参数，有四个参数
            * __filename__:(String类型)拍照或摄像文件保存的路径，如未设置文件名称或设置的文件名冲突则文件名由程序程序自动生成。
            * __format__: (String 类型 )拍照或摄像的文件格式，可通过可读属性获取,如`format：obj.supportedVideoFormats[0]`
            * __index__: (String类型)拍照或摄像默认使用的摄像头，`1`表示主摄像头，`2`表示辅摄像头
            * __popover__: (PopPosition 类型 )拍照或摄像界面弹出指示区域
    * __方法3__：`stopVideoCapture()`：结束摄像操作
        * 通过`obj.stopVideoCapture()`来停止录像的功能
    * __可读属性1__：`supportedImageResolutions`: 字符串数组，摄像头支持的拍照分辨率
        * 若不支持此属性则返回空数组对象。摄像头支持的拍照图片分辨率字符串形式“WIDTH*Height”
    * __可读属性2__：`supportedVideoResolutions`: 字符串数组，摄像头支持的摄像分辨率
        * 若不支持此属性则返回空数组对象。摄像头支持的视频分辨率字符串形式为“WIDTH*Height”，
    * __可读属性3__：`supportedImageFormats`: 字符串数组，摄像头支持的拍照文件格式
        * 若不支持此属性则返回空数组对象。摄像头支持的图片文件格式字符串形式为文件格式后缀名，如`jpg、png、bmp`
    * __可读属性4__：`supportedVideoFormats`: 字符串数组，摄像头支持的摄像文件格式
        * 若不支持此属性则返回空数组对象。摄像头支持的视频文件格式字符串形式为文件格式后缀名，如`3gp、mp4、avi`
    
#### 注意：手持设备不同方向所拍摄的照片会导致本地浏览的时候，照片的方向会旋转，但在系统相册中会自动纠正，这一问题在ios和android中都存在。所以有时候5+拍照上传图片，然后在本地显示的时候会看到图片旋转了位置。这个问题在使用h5+自定义的相册选择界面时，会很明显看出照片是和最初拍摄的方向一样的。我个人认为有两种解决方案：
* 第一种是使用`Exif.js`来获取图片的拍照方向，然后设置旋转就能解决问题
* 第二种是使用5+里面的`orientation`设备方向信息，在拍摄的时候监听设备旋转的方向，当拍照完成的时候，停止监听并判断旋转的方向，然后再根据这个方向，设置图片的额旋转度数。


---
<h3 id="Contacts">系统通讯录Contacts</h3>

### [详细文档](http://www.html5plus.org/doc/zh_cn/contacts.html)
#### 通过`plus.contacts.getAddressBook( type, succesCB, errorCB)`获取通讯录对象，无返回值
* type:必选 指定通讯录类型，有两种类型:
    * `plus.contacts.ADDRESSBOOK_PHONE`:从手机通讯录中获取联系人
    * `plus.contacts.ADDRESSBOOK_SIM`:从SIM卡中获取联系人
* successCB：function(obj){},获取通讯录成功回调函数（必选）
    * __obj__:获取到的通讯录对象（必选）,该对象有两个方法，一个是**create**:创建联系人，一个是**find**: 在通讯录中查找联系人
        * `obj.create()`:返回的是一个联系人对象，该对象有如下属性，假设该对象为**op**
            * `op.id`: 联系人的id，只读属性，不要修改
            * `op.displayName`: 联系人显示的名字
            * `op.name`: 联系人的名称,有六个属性
            * `op.nickname`: 联系人的昵称
            * `op.phoneNumbers`: 联系人的电话,
            * `op.emails`: 联系人的邮箱
            * `op.addresses`: 联系人的地址
            * `op.ims`: 联系人的即时通讯地址
            * `op.organizations`: 联系人所属组织信息
            * `op.birthday`: 联系人的生日
            * `op.note`: 联系人的备注
            * `op.photos`: 联系人的头像
            * `op.categories`: 联系人的组名
            * `op.urls`: 联系人的网址  
            
            **op**对象还有三个方法：
            * `op.clone()`: 克隆联系人,返回一个克隆出的op对象
            * `op.remove( successCB, errorCB )`: 删除联系人
                * __successCB__：`function(){}`,必选 删除联系人操作成功回调
                * __errorCB__：`function(err){}`,可选 删除联系人操作失败回调
                    * __err__:必选 联系人操作的错误信息
            * `op.save( successCB,errorCB)`:保存联系人,`successCB`和`errorCB`与**op.remove**的是一样的
           

```javascript
//例子
op.name = {givenName:"王安"};   注意，这里一定是givenName，用displayName创建不了  
op.phoneNumbers = [{type:"手机",value:"88888888",preferred:true}];phoneNumber是一个数组，里面每一项的value值就是电话号码
```
    
* * * `obj.find( contactFields, successCB, errorCB, findOptions )`
    * __contactFields__：（必选）查找返回联系人中需要包含的信息。可取Contact对象的属性名称，若指定为null或""或空数组则包含所有联系人信息。例["displayName","phoneNumbers"],数组里的内容是Contact对象的属性，不能自己定义
    * __successCB__：`function(contacts){}`（必选）**contacts**是上面的`op`对象对象
    * __errorCB__：`function（err）{}` 联系人操作失败回调函数（可选）
        * __err__: 必选 联系人操作的错误信息
    * __findOptions__：JSON对象，有两个值（可选）
        * __filter__: 数组类型，查找时的过滤器，可设置为空，表示不过滤。有三个属性值
            * __logic__: (String 类型 )区配的逻辑
            * __field__: (String 类型 )区配的联系人域，可取联系人的属性名称
            * __value__: (String 类型 )区配的联系人值，可使用区配符号“?”和“*”，可看下面的例子说明
            * __multiple__: (Boolean 类型 )是否查找多个联系人，默认值为true
> **value**的例子：// 区配所有包括姓或名中包括“王”的联系人`[{logic:"or",field:"displayNam",value:"\*王*"}`,`{logic:"or",field:"nickname",value:"\*王*"}`]当value里面的\*号只有一个且在最左边时即"\*王"，表示是以“王”字结尾的，只有一个且在右边时，即"王\*",表示是以“王”字开头的。如果有两个，一个左边一个右边，就表示只要包含了“王”字的我自己测试，得到以“？”号的匹配符，不支持左右两边都为问号的情况。所以自认为最好选择*为匹配符

* __errorCB__：`function（err）{}`获取通讯录成功回调函数
	* __err__：是错误信息

---

<h3 id="Audio">音频录制和播放Audio</h3>

### [详细文档](http://www.html5plus.org/doc/zh_cn/audio.html)
#### 音频管理对象有两个方法，一个是getRecorder: 获取当前设备的录音对象，一个是createPlayer: 创建音频播放对象
##### 第一个方法：获取录音对象
* `plus.audio.getRecorder()`可获得一个对象，假设对象为**obj**。`var obj=plus.audio.getRecorder()`,**obj**对象也有两个方法，两个属性
    * 两个方法如下：
        * `obj.record(option, successCB, errorCB)`,调用设备麦克风进行录音操作
            * __option__： ( json对象 ) 必选 设置录音的参数，有三个值
                * __filename__: (String类型)保存录音文件的路径可设置具体文件名，也可只设置路径，如果以“/”结尾则表明是路径，文件名由录音程序自动生成。如未设置则使用默认目录生成随机文件名称，默认目录为应用%APPID%下的documents目录。
                * __samplerate__:(String类型)录音文件的采样率，需通过`supportedSamplerates`属性获取设备支持的采样率，若设置无效的值，则使用系统默认的采样率
                * __format__: (String类型)录音文件的格式，需通过`supportedFormats`属性获取设备支持的录音格式，若设置无效的值，则使用系统默认的录音格式。
            * __successCB__: `funciont(path){}`  必选 录音操作成功回调函数，在录音完成调用`stop（）`之后才能有效果
                * __path__：录音操作保存的音频文件路径
            * __errorCB__: `function(err){}`  可选 录音操作错误回调函数
                * __err__： 必选 音频操作的错误信息
        * `obj.stop()`: 结束录音操作,通知设备完成录音操作。录音完成后将调用`record`方法中传入的successCB回调返回录音文件
    * 两个属性如下：
        * __supportedSamplerates__: 数组，设备录音支持的采用率，只读属性
        * __supportedFormats__: 数组，设备录音支持的文件格式，只读属性
##### 第二个方法：获取音频播放对象
* `plus.audio.createPlayer(path)`可获得一个音频播放对象，假设对象为**op**，`var op=plus.audio.createPlayer( path )`，path是要播放的音频文件路径，ios暂不支持播放网络路径音频，但是安卓却支持
    * __op__对象有多个方法：
        * `op.play(function(){},function(){})`:开始播放音频。第一个函数是音频播放操作成功的回调函数，在音频播放完成或调用`stop()`方法时触发。第二个参数是音频操作的错误信息
        * `op.pause()`,暂停播放音频，音频播放对象在播放状态才能暂停，在其它状态调用此方法无任何作用
        * `op.resume()`,恢复播放音频，音频播放对象在暂停状态才能恢复播放，在其它状态调用此方法无任何作用。
        * `op.stop()`,停止播放音频，音频播放对象在播放或暂停状态才能停止播放，在其它状态调用此方法无任何作用。 停止播放后如果需要继续播放，则需调用play方法重新开始播放。
        * `obj.seekTo(num)`,跳到指定位置播放音频，音频播放对象在播放或暂停状态才能跳到指定播放音频，在其它状态调用此方法无任何作用。参数num的单位是秒s
        * `obj.getDuration()`,获取音频流的总长度，单位为秒，若长度未知则返回-1。如果还未获取到音频流信息则返回NaN，此时需要延迟获取此信息.返回值是一个数字
        * `obj.getPosition()`,获取音频流当前播放的位置（已播放的长度），单位为s。返回值是当前音频播放的位置，单位为s，如果音频文件未准备好则返回0。
        * `obj.setRoute( route)`,可在音频文件开始播放前或播放的过程中改变音频输出线路，默认使用扬声器（`plus.audio.ROUTE_SPEAKER`）输出线路。
            * __route__:( Number类型 ) 必选 音频播放时输出线路常量,可设置audio的ROUTE_*常量值，设置后立即生效。
                * __Number__有两个值
                    * __ROUTE_SPEAKER__:设备的扬声器音频输出线路,音频输出线路常量，值为0。音频播放时在设备的扬声器输出。
                    * __ROUTE_EARPIECE__:设备听筒音频输出线路,音频输出线路常量，值为0。音频播放时在设备的扬声器输出。
    
---

<h3 id="orientation">设备方向信息orientation</h3>

### [详细文档](http://www.html5plus.org/doc/zh_cn/orientation.html)
#### 设备方向对象有三个方法，一个是`getCurrentOrientation`: 获取当前设备的方向信息，一个是`watchOrientation`: 监听设备方向信息的变化，还有一个是`clearWatch`: 关闭监听设备方向信息
##### 第一个方法：`getCurrentOrientation`
* `plus.orientation.getCurrentOrientation( successCB, errorCB )`，获取当前设备方向信息
    * __successCB__：`function(obj){}`必选 获取设备方向信息成功回调函数
        * __obj__是一个json对象，里面是设备方向的信息数据
            * __beta__: (float 类型 )以x方向为轴心的旋转角度
            * __gamma__: (float 类型 )以y方向为轴心的旋转角度
            * __alpha__: (float 类型 )以z方向为轴心的旋转角度
            * __magneticHeading__:(float类型)设备方向与地球磁场北极方向的角度，可用于指南针，iTouch、iPad设备不支持
            * __trueHeading__: (float 类型 )设备方向与地球真实北极方向的角度， iTouch、iPad设备不支持
            * __headingAccuracy__: (float 类型 )设备方向值的误差值，iTouch、iPad设备不支持
    * __errorCB__: `function(err){}`可选 获取设备方向信息失败回调函数
        * __err__: 必选 失败信息
##### 第二个方法：`watchOrientation`，该方法会返回一个`number`类型的值，用于标识方向信息监听器，相当于监听的ID值，可通过`clearWatch`方法取消监听。
* `plus.orientation.watchOrientation( successCB, errorCB, option）`：监听设备方向信息的参数，如更新数据的频率等 );每个固定时间就获取一次设备方向信息
    * __successCB__：`function(op){}`必选 获取设备方向信息成功回调函数
        * `op`和上面的`obj`是一样的
    * __errorCB__：`function(err){}`可选 获取设备方向信息失败回调函数
    * __option__：监听设备方向信息的参数，是一个json对象，有一个值
        * __frequency__: (Number 类型 )更新方向信息的时间间隔，单位为ms，默认值为500ms。
##### 第三个方法：`clearWatch`
* `plus.orientation.clearWatch( watchId )`;关闭监听设备方向信息
    __watchId__: ( Number ) 必选 需要取消的方向监听器标识，调用`watchOrientation`方法的返回值。

---

<h3 id="nativeUI">管理系统原生界面nativeUI</h3>

### [详细文档](http://www.html5plus.org/doc/zh_cn/nativeui.html)
#### 系统原生界面有`toast`,`confirm`,`actionSheet`,`alert`,`showWaiting`，`pickDate`，`pickTime`，`prompt`,`previewImage`
#### `actionSheet`
* 通过`plus.nativeUI.actionSheet(actionsheetStyle,actionsheetCallback)`；获取弹出系统选择按钮框，有返回值，返回一个对象，假设为__obj__
    * __actionsheetStyle__：必选 选择按钮框显示的样式，是一个json对象，有三个值：
        * __title__: (String 类型 )选择按钮框的标题
		* __ancel__: (String 类型 )取消按钮上显示的文字内容，不设置此属性，则不显示取消按钮。
		* __buttons__: (数组 类型 )选择框上的按钮，该按钮也是一个对象，有三个值
		    * __color__: (String 类型 )按钮上显示的文字颜色，支持rgba
			* __title__: (String 类型 )按钮上显示的文字内容
			* __style__: (String 类型 )按钮的样式可取值： "**destructive**" - 表示警示按钮样式，颜色为红色； "**default**" - 表示默认按钮样式。 默认值为"default"。
    * __actionsheetCallback__:  `function(e){}`， 可选 选择按钮框关闭后的回调函数
        * __e__：必选，用户操作选择按钮框关闭后返回的数据e.index表示索引值，0表示取消按钮，大于0的即取消上面的按钮

    * 返回的obj对象只有一个方法：close（）
        * `obj.close()` 此情况下触发界面关闭回调函数参数的index属性值为-1。注意：一个系统原生界面只能关闭一次，多次调用将无任何作用。
#### `alert`
* `plus.nativeUI.alert( message,alertCB,title,buttonCapture)`；弹出系统提示对话框。弹出的提示对话框为非阻塞模式，用户点击提示对话框上的按钮后关闭，并通过alertCB回调函数通知对话框已关闭。
    * __message__: ( String ) 必选 提示对话框上显示的内容
    * __alertCB__: `function（e）{}` 可选 提示对话框上关闭后的回调函数
        * __e__：表示用户操作确认对话框关闭后返回的数据可通过event.index（Number类型）获取用户关闭确认对话框点击按钮的索引值，点击确认键的索引值为0。Android平台上通过设备的返回键关闭时索引值为-1。由于ios没有返回键即可忽略
    * __title__: ( String ) 可选 提示对话框上显示的标题
    * __buttonCapture__: ( String ) 必选 提示对话框上按钮显示的内容

```
注意：
title可以不要，但是要把它位置留着，置为空即"" 这样就行，否则butTxt会成为title，而按钮内容则会是默认的“确定”
Android手机上通过返回键关闭时索引值为-1。
```

#### `confirm`
* `plus.nativeUI.confirm(message, confirmCB, options)`；不推荐`plus.nativeUI.confirm(message, confirmCB, title, buttons)`这种写法，这里面的**buttons**和**title**都不推荐单独写，可在**options**中设置
    * __message__: ( String ) 必选 确认对话框上显示的内容
    * __confirmCB__:`function（e）{}`， 可选 确认对话框关闭后的回调函数
        * __e__:可通过e.index可获取用户点击按钮的索引值
    * __options__: ( json对象) 可选 确认对话框的参数
        * __title__: (String 类型 )确认对话框显示的标题，如果不设置，则不显示标题
        * __buttons__: ( 数组类型)确认对话框上显示的按钮字符串数组，每项对应在确认对话框上显示一个按钮，用户点击后通过confirmCB返回用户点击按钮的在数组中的索引值。
        * __verticalAlign__: (String类型)对话框在屏幕中的垂直分享对齐方式，默认"**center**"（垂直居中对齐），还有 "**top**" - 表示垂直居顶对齐； "**bottom**" - 表示垂直居底对齐

```
注意：
假设options中的buttion设置为["a取消","b按钮1","c按钮2"]
按钮最多能设置3个，在页面上显示排列的顺序是 b c a，a对应索引值0，表取消，b为索引值1,c为索引值2
```


#### `prompt`
* `plus.nativeUI.prompt( message, promptCB, title, tip, buttons )`;
    * __message__: ( String ) 必选 输入对话框上显示的内容
    * __promptCB__: `function（e）{}`， 可选 关闭输入对话框的回调函数
        * __e__：`e.index`可获取用户点击按钮的索引值，e.value获取输入内容
    * __title__: ( String ) 可选 输入对话框上显示的标题
    * __tip__: ( String ) 可选 输入对话框上编辑框显示的提示文字，即placeholder的作用
    * __buttons__: ( 数组类型 ) 可选 输入对话框上显示的按钮数组

```
注意：
假设buttion设置为["a0","b1","c2"]
按钮最多能设置3个，在页面上显示排列的顺序是 b c a， a对应索引值0，b为索引值1,c为索引值2
```

#### `toast`，有两个方法，一个调用，一个关闭close
* 调用：`plus.nativeUI.toast( message, options )`
    * __message__: 必选 提示消息上显示的文字内容
    * __options__: 可选 提示消息的参数，是一个json对象，有5个属性
        * __align__: (String 类型 )提示消息框在屏幕中的水平位置，可选：left,center,right,默认是center
        * __duration__: (String类型)提示消息框显示的时间，只有两个值，一个long（约3.5s），一个short(约2s)，默认为short
        * __icon__: (String 类型 )提示消息框上显示的图标，值是图片的路径
        * __style__: (String 类型)提示消息框上显示的样式，有两个值，一个block（图标文字各占一行），一个inline（图标文字同一行），默认是block
        * __type__: (String 类型 )提示消息框上显示的文本类型，有两个值，一个text，一个richtext，默认值为"text"
            * "__text__" - 显示的消息内容为文本字符串；
            * "__richtext__" - 显示的消息内容为富文本内容。富文本可使用a标签和img标签，可通过点击事件得到相应的属性值
        * __richTextStyle__: (一个json对象)富文本样式，有4个属性，当type属性值为"**richtext**"时有效，用于定义富文本的样式，如其文本对齐方式、使用的字体等
            * __align__: (String 类型 )富文本内容的水平对齐方式，可选值：left,right,center，默认值为left
            * __family__: (String 类型 )富文本默认使用的字体名称，如果指定名称的字体不存在，则使用系统默认字体。
            * __fontSrc__: (String类型)富文本默认使用的字体文件路径，加载字体文件路径，必须为本地路径，如果指定的文件路径无效，则使用系统默认字体
            * __onClick__: `function(e){}`，点击事件回调函数，如果设置此属性，则表示拦截所有RichText上的点击事件（不透传事件）。 如果没有设置此属性，则仅拦截操作包含onclick属性的a/img标签的点击事件。
                * __e__:必选，点击事件的参数,有三个值
                    * __tagName__:如果点击的是富文本中的a标签，则返回的是“a”,如果点击的是img标签，则返回的是“img”，否则是空字符串
                    * __href__：当点击的是富文本中的a标签是才有效
                    * __src__：当点击的是富文本中的img标签时才有效
        * __verticalAlign__: (String 类型)提示消息在屏幕中的垂直位置，可选值为"top"、"center"、"bottom"，默认为bottom
* 关闭：`plus.nativeUI.closeToast();`

```
注意：
1. 富文本的标签支持<a></a>标签，<img></img>标签，<font></font>标签,<br/>换行标签
2. img标签，可设置src，可设置宽高，不用加上style=“”，直接是width=""height=""，还有onclick事件，onclick="console.log(‘img’)"
3. a标签，不能跳转，但可设置href，可设置font-size，可以设置颜色(不支持英文写法，“red”这种)，这个需要加上style="font-size:12px;color:'green'",还有还有onclick事件，onclick="console.log(‘a’)"
4. font标签，可设置颜色，不用加上stle=""，直接是color："red";字体必须都写在font标签里面，不然显示不出来
5. <br />是换行标签
6. 经过测试得到，颜色只支持16进制的格式和rgba格式#FFAEC9，rgba(28,162,97,.6)，而且16进制的不加号都行，其它的英文格式“red”，或者rgb（0,0,0）都不支持

7. richTextStyle中的onClick事件经过测试感觉没触发，Android8.0.0，小米6
```
#### `showWaiting`显示等待框
* `plus.nativeUI.showWaiting( title, options )`；返回一个`waiting`对象，该对象用于关闭等待框
    * __title__: ( String ) 可选 等待对话框上显示的提示标题内容
    * __options__:  一个json对象，可选 等待对话框的显示参数，有如下的属性
        * __width__: (String 类型 )等待框背景区域的宽度，不设置则自适应
        * __height__: (String 类型 )等待框背景区域的高度，不设置则自适应
        * __color__: (String 类型 )等待框中文字的颜色，默认为白色
        * __size__: (String 类型 )等待框中文字的字体大小，未设置则使用系统默认字体大小
        * __textalign__: (String 类型 )等待对话框中标题文字的水平对齐方式，可选值为left,center,right，默认为center
        * __padding__: (String 类型 )等待对话框的内边距
        * __background__: (String 类型 )等待对话框显示区域的背景色
        * __style__: (String 类型 )等待对话框样式，可选值：black、white 
            * __black__:表示等待框为黑色雪花样式
            * __white__：表示等待框为白色雪花样式
            * 仅在**IOS**下有用，安卓忽略此值，未设置即默认是**white**
        * __modal__: (Boolen 类型)等待框是否模态显示，如果设置为true，则可以操作等待框底下的内容区域，如果设置为false，则不能操作，相当于是否加个蒙层阻止用户操作，默认为true
        * __round__: (Number 类型 )等待框显示区域的圆角，默认为10px
        * __padlock__: (Boolen 类型 )点击等待显示区域是否自动关闭，默认值是false
        * __back__: (String 类型 )返回键处理方式，值针对安卓平台，IOS无返回键，可取值：
            * "__none__"表示截获处理返回键，但不做任何响应；
            * "__close__"表示截获处理返回键并关闭等待框；
            * "__transmit__"表示不截获返回键，向后传递给Webview窗口继续处理（与未显示等待框的情况一致）
        * __loading__: 一个json对象，有四个属性，自定义等待框上loading图标样式
            * __display__: (String 类型 )loading图标显示样式，有两个值
                * __block__：图片与文字各占一行
                * __inline__：图片与文字同一行
            * __height__: (String 类型 )loading图标高度
            * __icon__: (String类型)loading图标路径，自定义loading图标的路径，PNG格式，必须是本地资源地址，loading图要求宽是高的整数倍，显示等待框时按照图片的高横向截取每帧刷新。
            * __interval__: (Number 类型 )loading图每帧刷新间隔
            
#### `pickDate`：系统日期选择对话框
* `plus.nativeUI.pickDate( successCB, errorCB, options )`
    * __successCB__：`function(e){}`	 必选 日期选择操作成功的回调函数
        * __e__:必选 用户完成选择日期或时间后返回的数据可通过e.date（Date类型）获取选择的日期或时间值。若调用的是日期选择操作则仅年、月、日信息有效，若调用的是时间选择操作则仅时、分信息有效。
    * __errorCB__:`function(err){}` 可选 日期选择操作取消或失败的回调函数
        * __err__: 必选 用户选择操作失败信息.可通过`err.code`（Number类型）获取错误编码；可通过`err.message`（String类型）获取错误描述信息
    * __options__:日期选择对话框参数，有5个属性值
        * __title__: (String 类型 )日期选择对话框显示的标题，如果未设置标题，则默认显示标题为当前选择的日期。
        * __date__: (Date 类型 )日期选择对话框默认显示的日期。如果未设置默认显示的日期，则显示当前的日期
        * __minDate__: (Date 类型)日期选择对话框可选择的最小日期，Date类型对象，如果未设置可选择的最小日期，则使用系统默认可选择的最小日期值。
        * __maxDate__: (Date 类型)日期选择对话框可选择的最大日期Date类型对象，如果未设置可选择的最大日期，则使用系统默认可选择的最大日期值。 其值必须大于minDate设置的值，否则使用系统默认可选择的最大日期值。
        * __popover__: (JSON 类型 )时间选择对话框弹出指示区域。JSON类型对象，格式如`{top:10;left:10;width:200;height:200;}`，所有值为像素值，其值为相对于容器Webview的位置。 如未设置此值，默认在屏幕居中显示。仅在iPad上有效，其它设备忽略此值。
					
```
注意：
title,minDate,maxDate三个属性在有些手机上没作用
```

#### `pickTime`：系统时间选择对话框
* `plus.nativeUI.pickTime( successCB, errorCB, options )`
    * __successCB__：`function(e){}`	 必选 时间选择操作成功的回调函数
        * __e__：必选 用户完成选择日期或时间后返回的数据可通过e.date（Date类型）获取选择的日期或时间值。 若调用的是日期选择操作则仅年、月、日信息有效，若调用的是时间选择操作则仅时、分信息有效。
    * __errorCB__:`function(err){}` 可选 时间选择操作取消或失败的回调函数
        * __err__：必选 用户选择操作失败信息.可通过`err.code`（Number类型）获取错误编码；可通过`err.message`（String类型）获取错误描述信息。
    * __options__:时间选择操作的参数，有5个属性值
        * __title__: (String 类型 )时间选择对话框显示的标题，如果未设置标题，则默认显示标题为当前选择的日期。
        * __time__: (Date 类型 )时间选择对话框默认显示的时间
        * __is24Hour__: (Boolean 类型 )是否24小时制模式,默认为true
        * __popover__: (JSON 类型)日期选择对话框弹出指示区域。JSON类型对象，格式如`{top:10;left:10;width:200;height:200;}`，所有值为像素值，其值为相对于容器Webview的位置。如未设置此值，默认在屏幕居中显示。仅在iPad上有效，其它设备忽略此值。
        
#### `previewImage`：预览图片
* `plus.nativeUI.previewImage(urls, options)`，创建并显示全屏图片预览界面，用户点击图片或返回键退出预览界面。
    * __urls__:数组类型，必选 需要预览的图片地址列表。支持网络地址，也支持本地地址
    * __options__：一个json对象。有四个属性
        * __background__: (String 类型 )图片预览的背景颜色，格式为16进制
        * __current__: (Number 类型 )默认显示图片的索引值，索引值从0开始，默认值为0。
        * __indicator__: (String 类型 )图片指示器样式，"**default**" - 默认指示器（底部圆点样式）； "**number**" - 顶部数字指示器（顶部居中显示，文字为%当前图片索引值（从1开始）%/%图片总数%）； "**none**" - 不显示指示器。 默认值为"**default**"。
        * __loop__: (Boolean 类型 )是否可循环预览，"true" - 支持循环预览； "false" - 不支持循环预览。 默认值为"false"。
---

<h3 id="geolocation">获取地理位置geolocation</h3>

### [详细文档](http://www.html5plus.org/doc/zh_cn/geolocation.html)
#### 获取地理位置有三个方法，`getCurrentPosition`，`watchPosition`，`clearWatch`
#### `getCurrentPosition`：获取当前设备位置信息
* `plus.geolocation.getCurrentPosition(successCB,errorCB,option)`;位置信息将通过手机GPS设备或其它信息如IP地址、移动网络信号获取，由于获取位置信息可能需要较长的时间，当成功获取位置信息后将通过successCB回调函数返回。
    * __successCB__: `function(pos){}`， 必选 获取设备位置信息成功回调函数
        * __pos__:设备的地理位置信息,有5个属性
            * __coords__: json对象，地理坐标信息，包括经纬度、海拔、速度等信息，有7个属性
                * __latitude__: (Number 类型 )坐标纬度值
                * __longitude__: (Number 类型 )坐标经度值
                * __altitude__: (Number 类型 )海拔信息，如果无法获取此信息，则此值为空（null）
                * __accuracy__: (Number 类型 )地理坐标信息的精确度信息
                * __altitudeAccuracy__:(Number类型)海拔的精确度信息，单位为米，其有效值必须大于0。如果无法获取海拔信息，则此值为空（null）
                * __heading__: (Number类型)表示设备移动的方向，范围为0到360，表示相对于正北方向的角度。如果无法获取此信息，则此值为空（null）。如果设备没有移动则此值为NaN。
                * __speed__: (Number类型)表示设备移动的速度，单位为米每秒（m/s），其有效值必须大于0。如果无法获取速度信息，则此值为空（null）
            * __coordsType__: (String 类型 )获取到地理坐标信息的坐标系类型，有四个值
                * __gps__：表示WGS-84坐标系；
                * __gcj02__：表示国测局经纬度坐标系；
                * __bd09__：表示百度墨卡托坐标系；
                * __bd09ll__：表示百度经纬度坐标系。
            * __timestamp__: (Number 类型 )获取到地理坐标的时间戳信息，可通过new Date（时间戳）来获取时间对象
            * __address__: (Address类型)获取到地理位置对应的地址信息，获取地址信息需要连接到服务器进行解析，所以会消耗更多的资源，如果不需要获取地址信息可通过设置options参数的geocode属性值为false避免获取地址信息。 如果没有获取到地址信息则返回undefined。
                * __country__: (String 类型 )国家
                * __province__: (String 类型 )省份名称
                * __city__: (String 类型 )城市名称
                * __district__: (String 类型 )区（县）名称
                * __street__: (String 类型 )街道信息
                * __streetNum__: (String 类型 )获取街道门牌号信息
                * __poiName__: (String 类型 )POI信息
                * __postalCode__: (String 类型 )邮政编码
                * __cityCode__: (String 类型 )城市代码
                * 如果以上的值是`undefined`，说明未获取到信息
            * __addresses__: (String 类型 )获取完整地址描述信息，如果未获取到则是undefined
    * __errorCB__: `function(err){}`， 可选 获取设备位置信息失败回调函数
        * __err__:必选 获取位置操作的错误信息,`error.code`（Number类型）获取错误编码，`error.message`（String类型）获取错误描述信息
    * __options__: 一个json对象。可选 获取设备位置信息的参数，
        * __enableHighAccuracy__:(Boolean类型)是否高精确度获取位置信息，高精度获取表示需要使用更多的系统资源，默认值为false。
        * __timeout__: (Number类型)获取位置信息的超时时间，单位为毫秒（ms），默认值为不超时。如果在指定的时间内没有获取到位置信息则触发错误回调函数。
        * __maximumAge__: (Number 类型 )获取位置信息的间隔时间
        * __provider__: (String 类型 )优先使用的定位模块，有三个值
            * __system__：表示系统定位模块，支持wgs84坐标系；
            * __baidu__：表示百度定位模块，支持gcj02/bd09/bd09ll坐标系；
            * __amap__"：表示高德定位模板，支持gcj02坐标系。
            * `默认值按以下优先顺序获取（amap>baidu>system），若指定的provider不存在或无效则返回错误回调`。
            * `注意：百度/高德定位模块需要配置百度/高德地图相关参数才能正常使用`。
        * __coordsType__: (String 类型 )指定获取的定位数据坐标系类型
            * __"wgs84"__：表示WGS-84坐标系
            * __"gcj02"__：表示国测局经纬度坐标系
            * __"bd09"__：表示百度墨卡托坐标系
            * __"bd09ll"__：表示百度经纬度坐标系
            * `provider为"system"时，默认使用"wgs84"坐标系`
            * `provider为"baidu"时，默认使用"gcj02"坐标系`
            * `provider为"amap"时，默认使用"gcj02"坐标系`
            * `如果设置的坐标系类型provider不支持，则返回错误`
        * __geocode__: (Boolean 类型)是否解析地址信息，解析的地址信息保存到pos对象的address、addresses属性中
            * __true__表示解析地址信息
            * __false__表示不解析地址信息
            * `返回的pos对象的address、addresses属性值为undefined，默认值为true`
            * `如果解析地址信息失败则返回的pos对象的address、addresses属性值为null`

#### `watchPosition`：获取当前设备位置信息
* `plus.geolocation.watchPosition(successCB,errorCB,option)`，监听设备位置变化，返回一个`number`值，可用于停止监听这个方法里三个参数都是和上面的`getCurrentPosition`参数一样

```
注意：
如果获取地理位置的时候返回error，查看是否连接了网络，或者给与了获取地理位置的权限
```

#### `clearWatch`：关闭监听设备位置信息
*  `plus.geolocation.clearWatch(watchId)，watchId是watchPosition方法返回的那个number值`
