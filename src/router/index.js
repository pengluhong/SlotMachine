import Vue from 'vue'
import Router from 'vue-router'

import BaseLayout from '@/components/base/baseLayout';
import NotFoundComponent from '@/components/base/notFound';
import MainLayout from '@/components/main/layout/mainLayout';
import Index from '@/components/main/index/index';
import GameDetails from '@/components/main/games/gameDetails';
import MemberInfor from '@/components/main/member/memberInfor';
import MemberCard from '@/components/main/member/memberCard';
import Notice from '@/components/main/notice/Notice';
import ProbabilityControl from '@/components/main/Console/probabilityControl';

Vue.use(Router)

export default new Router({
	mode: 'history',
	//linkExactActiveClass: 'current',
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
					//游戏数据
					path: 'GameDetails',
					component: GameDetails,
				}, {
					//会员信息查询
					path: 'MemberInfor',
					component: MemberInfor,
				}, {
					//会员牌局查询
					path: 'MemberCard',
					component: MemberCard,
				}, {
					//会员牌局查询
					path: 'Notice',
					component: Notice,
				}, {
					//概率游戏控制台
					path: 'ProbabilityControl',
					component: ProbabilityControl,
				}]
			}]
		}
	]
})