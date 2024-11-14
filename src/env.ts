declare global {
  var projectEnv: string | undefined
  var taskEnv: string | undefined
  var priorityEnv: string | undefined
  var estimateEnv: string | undefined
  var actionEnv: string | undefined
  var areaEnv: string | undefined
  var tokenEnv: string | undefined
  var refreshEnv: string | undefined
}

const projectEnv = global.projectEnv || process.env.NOTION_DATABASE_PROJECT_ID
const taskEnv = global.taskEnv || process.env.NOTION_DATABASE_TASK_ID
const priorityEnv =
  global.priorityEnv || process.env.NOTION_DATABASE_PRIORITY_ID
const estimateEnv =
  global.estimateEnv || process.env.NOTION_DATABASE_ESTIMATE_ID
const actionEnv = global.actionEnv || process.env.NOTION_DATABASE_ACTION_ID
const tokenEnv = global.tokenEnv || process.env.JWT_SECRET
const refreshEnv = global.refreshEnv || process.env.JWT_REFRESHEnv
const areaEnv = global.areaEnv || process.env.NOTION_DATABASE_AREA_ID

if (process.env.NODE_ENV === 'development') global.projectEnv = projectEnv
if (process.env.NODE_ENV === 'development') global.taskEnv = taskEnv
if (process.env.NODE_ENV === 'development') global.priorityEnv = priorityEnv
if (process.env.NODE_ENV === 'development') global.estimateEnv = estimateEnv
if (process.env.NODE_ENV === 'development') global.actionEnv = actionEnv
if (process.env.NODE_ENV === 'development') global.areaEnv = areaEnv
if (process.env.NODE_ENV === 'development') global.tokenEnv = tokenEnv
if (process.env.NODE_ENV === 'development') global.refreshEnv = refreshEnv

export {
  projectEnv,
  taskEnv,
  priorityEnv,
  estimateEnv,
  areaEnv,
  actionEnv,
  tokenEnv,
  refreshEnv,
}
