/**
 * MVU 数据类型定义
 * 从 schema 推导，保持类型同步
 */
import type { Schema } from '@/data_schema/schema';

/**
 * 完整的 stat_data 类型
 */
export type StatData = z.infer<typeof Schema>;

/**
 * 世界信息
 */
export type WorldInfo = StatData['世界'];

/**
 * 任务信息
 */
export type Task = StatData['任务列表'][string];

/**
 * 玩家信息
 */
export type PlayerData = NonNullable<StatData['主角']>;

/**
 * 角色标识 (对应 schema 中的 主角, 主角1, 等)
 */
export type PlayerKey = '主角' | '主角1' | '主角2' | '主角3' | '主角4';

/**
 * 命运点数
 */
export type DestinyPoints = StatData['命定系统']['命运点数'];

/**
 * 关系列表信息
 */
export type Partner = StatData['命定系统']['关系列表'][string];

/**
 * 新闻信息
 */
export type News = StatData['新闻'];

/**
 * 登神长阶信息
 */
export type Ascension = PlayerData['登神长阶'];
