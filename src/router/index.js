import Vue from 'vue'
import Router from 'vue-router'

import BaseLayout from '@/components/base/baseLayout';
import NotFoundComponent from '@/components/base/notFound';
import MainLayout from '@/components/main/layout/mainLayout';

import Login from '@/components/main/login/Login';
import Index from '@/components/main/index/index';

import GlobalConfiguration from '@/components/main/gameConsole/globalConfiguration';
import GameConfiguration from '@/components/main/gameConsole/gameConfiguration';
import AnnouncementConfiguration from '@/components/main/gameConsole/announcementConfiguration';

import GlobalStatistics from '@/components/main/dataStatistics/globalStatistics';
import RoomStatistics from '@/components/main/dataStatistics/roomStatistics';
import MembershipStatistics from '@/components/main/dataStatistics/membershipStatistics';
import MembershipStatisticsDetails from '@/components/main/dataStatistics/memberShipStatisticsDetails';

import RoleManagement from '@/components/main/systemManagement/roleManagement';
import PersonnelManagement from '@/components/main/systemManagement/personnelManagement';

import AgencyManagement from '@/components/main/agent/agencyManagement';

import PlayerList from '@/components/main/playerManagement/playerList';

Vue.use(Router)

const router = new Router({
	mode: 'history',
	linkExactActiveClass: 'current',
	routes: [{
			// 找不到页面
			path: '*',
			component: NotFoundComponent,
		},
		{
			path: '/',
			component: BaseLayout,
			children: [{
				path: '',
				component: MainLayout,
				children: [{
					path: '',
					component: Index,
				}, {
					//代理管理
					path: 'Agent/AgencyManagement',
					component: AgencyManagement,
				}, {
					//全局配置
					path: 'GameConsole/GlobalConfiguration',
					component: GlobalConfiguration,
				}, {
					//游戏配置
					path: 'GameConsole/GameConfiguration',
					component: GameConfiguration,
				}, {
					//公告推送配置
					path: 'GameConsole/AnnouncementConfiguration',
					component: AnnouncementConfiguration,
				}, {
					//全局统计
					path: 'DataStatistics/GlobalStatistics',
					component: GlobalStatistics,
				}, {
					//房间统计
					path: 'DataStatistics/RoomStatistics',
					component: RoomStatistics,
				}, {
					//会员统计
					path: 'DataStatistics/MembershipStatistics',
					component: MembershipStatistics,
				}, {
					//会员统计详情
					path: 'DataStatistics/MembershipStatisticsDetails',
					component: MembershipStatisticsDetails,
				}, {
					//角色管理列表
					path: 'SystemManagement/RoleManagement',
					component: RoleManagement,
				}, {
					//后台人员管理列表
					path: 'SystemManagement/PersonnelManagement',
					component: PersonnelManagement,
				}, {
					//玩家列表
					path: 'PlayerManagement/PlayerList',
					component: PlayerList,
				}, ]
			}, {
				//登录
				path: 'Login',
				component: Login,
			}, ]
		}
	]
});

//路由前检查
router.beforeEach(async(to, from, next) => {
	//延长登录时间，防止登出
	localStorage.setItem('logoutTime', new Date().getTime() + (15 * 60 * 1000));
	
	//判断是否登录
	if(!localStorage.getItem('LoginToken')) {
		//未登录直接跳转到登录页
		if(to.path !== '/Login') {
			router.replace('/Login');
		}
	} else {
		//已登录的情况再去登录页，跳转至首页
		if(to.path === '/Login') {
			router.replace('/');
		}
	}
	next();
});

export default router;