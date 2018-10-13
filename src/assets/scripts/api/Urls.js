export default {
	Url: 'http://192.168.201.198:8080',

	//验证码
	AdminCaptcha: '/admin/captcha',
	//登录
	AdminLogin: '/admin/login',
	//退出
	AdminLogout:'/admin/logout',
	//获取菜单
	GameIndex: '/game/index',
	
	//改变网站颜色风格
	GameTheme:'/game/theme',

	/*最高代理模块*/
	//代理管理初始化请求
	ProxyIndex: '/proxy/index',
	//新增代理
	ProxyAdd: '/proxy/add',
	//修改代理
	ProxyEdit: '/proxy/edit',
	ProxyEditAdd: '/proxy/editAdd',
	//财务查看权限
	ProxyAllowFinance: '/proxy/allowFinance',
	//修改代理状态
	ProxyStatus: '/proxy/status',
	//更改密钥状态
	ProxyKeyStatus: '/proxy/keyStatus',
	//重新产出金钥
	ProxyRebuildSign: '/proxy/rebuildSign',
	/*end*/

	/*游戏控制台模块*/
	//游戏列表
	GameList:'/game/list',
	//全局配置
	GlobalConfiguration: '/game/global',
	//资金流分配设置修改
	fundUpdate: '/game/fund',
	//房间设置修改
	roomUpdate: '/game/room',
	//游戏配置
	GameConfiguration: '/game/config',
	//配置元素权重设置 + 美酒和全盘奖设置(修改)
	WeightEdit: '/game/edit',
	//计算回报率
	GameRoce: '/game/roce',
	//公告推送配置
	Notice: '/game/notice',
	//新增、编辑公告
	AddNotice: '/game/noticeEdit',
	//删除公告
	GameNoticeDel:'/game/noticeDel',
	//搜索公告
	/*end*/

	/*数据统计模块*/
	//全局统计
	AgentStatisticsSum: '/AgentStatistics/sum',
	//全局统计
	AgentStatistics: '/AgentStatistics/index',
	//房间统计
	RoomStatistics: '/RoomStatistics/index',
	//会员统计
	MemberStatisticsSum:'/MemberStatistics/sum',
	//会员统计
	MemberStatistics: '/MemberStatistics/index',
	//会员详情
	MemberInfor: '/MemberStatistics/information',
	/*end*/

	/*系统管理模块*/
	//角色管理列表
	GameRole: '/game/role',
	//权限列表
	GameMenus:'/game/menus',
	GameRoleDetail:'/game/roleDetail',
	//新增、编辑角色管理列表
	GameRoleEdit: '/game/roleEdit',
	//角色管理状态修改
	GameRoleStatus: '/game/roleStatus',
	//删除角色
	GameRoleDel: '/game/roleDel',
	//后台人员管理列表
	GameUser: '/game/user',
	//新增、编辑后台人员管理列表
	GameUserAdd: '/game/userAdd',
	//后台人员管理状态修改
	GameAdminStatus: '/game/adminStatus',
	//删除后台人员
	GameAdminDel: '/game/adminDel',
	/*end*/
	
	/*玩家管理模块*/
	//玩家列表、搜索
	GamePlayers:'/game/players',
	/*end*/
	
	/*日志管理模块*/
	/*系统日志*/
	SysLogGet:'/SysLog/get',
	/*项目类型*/
	SysLogTree:'/SysLog/logTree',
	/*end*/
	
	/*交易记录*/
	SysLogTrade:'/SysLog/trade',
	/*end*/
	
	/*投注记录*/
	/*投注记录列表以及查询*/
	BettingRecordIndex:'/BettingRecord/index',
	/*游戏类型*/
	BettingRecordGameType:'/BettingRecord/gameType',
	/*end*/
}