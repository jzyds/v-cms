import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const WineStock: CollectionConfig = {
  slug: 'wine-stock',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'SKU',
  },
  fields: [
    {
      name: 'SKU', // Stock Keeping Unit
      type: 'text',
      required: true,
    },
    {
      name: 'quantity', // 库存数量
      label: 'Quantity in Stock',
      type: 'number',
      required: true,
    },
    {
      name: 'purchase-price', // 进货价
      label: 'Purchase Price (in CNY) / bottle',
      type: 'number',
      required: true,
    },
    {
      name: 'categories', // 分类
      type: 'select',
      required: true,
      options: [
        '白酒',
        '威士忌',
        '葡萄酒',
        '啤酒',
        '黄酒',
        '米酒',
        '伏特加',
        '朗姆酒',
        '龙舌兰',
        '金酒',
        '白兰地',
        '清酒',
        '烧酒',
        '果酒',
        '利口酒',
        '苦艾酒',
      ],
    },
    {
      name: 'alcohol-content', // 酒精度
      label: 'Alcohol Content (%)',
      type: 'number',
      required: true,
    },
    {
      name: 'volume', // 容量 ml
      label: 'Volume (in ml)',
      type: 'number',
      required: true,
    },
    {
      name: 'procudtion-year', // 生产年
      type: 'number',
      required: true,
    },
    {
      name: 'liquor-flavor', // 酒的香型
      type: 'select',
      options: [
        '酱香型',
        '浓香型',
        '清香型',
        '米香型',
        '凤香型',
        '芝麻香型',
        '豉香型',
        '特香型',
        '老白干香型',
        '兼香型',
        '药香型',
        '馥郁香型',
      ],
      required: false,
    },
    {
      name: 'image', // 图片
      type: 'upload',
      relationTo: 'media',
      required: false,
      hasMany: true,
    },
    {
      name: 'purchase-source', // 购买渠道
      type: 'text',
      required: false,
    },
    {
      name: 'purchase-date', // 进货日期
      type: 'date',
      required: false,
      admin: {
        date: {
          displayFormat: 'YYYY-MM',
          pickerAppearance: 'monthOnly',
        },
      },
      // pickerAppearance: 'monthOnly',
    },
    {
      name: 'remarks', // 备注
      type: 'textarea',
      required: false,
    },
    {
      name: 'tasting-notes', // 品鉴笔记
      type: 'textarea',
      required: false,
    },
    {
      name: 'food-pairings', // 食物搭配
      type: 'textarea',
      required: false,
    },

    {
      name: 'expiry-date', // 保质期
      type: 'date',
      required: false,
    },
    {
      name: 'brand', // 品牌
      type: 'text',
      required: false,
    },
    {
      name: 'grape-variety', // 葡萄品种
      type: 'text',
      required: false,
    },
    {
      name: 'region', // 产区
      type: 'text',
      required: false,
    },
  ],
}
