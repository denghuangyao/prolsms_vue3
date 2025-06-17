export const menuPageData: MenuConfigRecordRaw = {
  icon: 'btn_aqjy',
  permission: 'jiaoyu:menu',
  label: '安全考试',
  children: [
    {
      path: 'zaixianlianxi',
      permission: 'work:lianxi',
      label: 'practiceExams',
      icon: 'dh_lxks',
      children: [
        {
          path: 'onlinePractice',
          permission: 'zaixian:chaxun',
          label: 'onlinePractice',
          componentPath: '/lianxikaoshi/zaixianlianxi',
        },
        {
          path: 'mockExam',
          permission: 'moni:chaxun',
          label: 'mockExam',
          componentPath: '/lianxikaoshi/monikaoshi',
        },
        {
          path: 'liveExam',
          permission: 'zhengshi:chaxun',
          label: 'liveExam',
          componentPath: '/lianxikaoshi/zhengshikaoshi',
        },
        {
          path: 'onlineLearning',
          permission: 'zaixianxuexi:chaxun',
          label: 'onlineLearning',
          componentPath: '/zaixianxuexi/zaixianxuexi',
        },
      ],
    },
    {
      path: 'aqjyKaoshiguanli',
      permission: 'aqjy:kaoshiguanli',
      label: 'ExaminationManagement',
      icon: 'dh_ksgl',
      children: [
        {
          path: 'examArrangement',
          permission: 'kaoshi:chaxun',
          label: 'examArrangement',
          componentPath: '/kaoshianpai/kaoshichaxun',
        },
        {
          path: 'managementPapers',
          permission: 'shijuan:chaxun',
          label: 'managementPapers',
          componentPath: '/shijuanguanli/shijuanchaxun',
        },
        {
          path: 'questionBankManagement',
          permission: 'tiku:chaxun',
          label: 'questionBankManagement',
          componentPath: '/tikuguanli/tikuguanlichaxun',
        },
        {
          path: 'testStatistics',
          permission: 'kaoshitongji:chaxun',
          label: 'testStatistics',
          componentPath: '/kaoshitongji/kaoshitongjichaxun',
        },
      ],
    },
  ],
}
