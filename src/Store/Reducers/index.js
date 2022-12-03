import {combineReducers} from 'redux'
import ExtraReducer from './ExtraReducer'
import GenRequestReducer from './GenRequestReducer'
import NotifiReducer from './NotificationReducer'
import PlanningRoleReducer from './PlanningRoleReducer'
import ProjectsReducer from './ProjectReducer'
import ReportReducer from './ReportReducer'
import ResourcePoolReducer from './ResourcePoolReducer'
import SpecRequestReducer from './SpecRequestReducer'
import UsersReducer from './UserReducer'
const rootReducer= combineReducers({
    Projects: ProjectsReducer,
    Users: UsersReducer,
    PlanningRoles: PlanningRoleReducer,
    ResourcePool:ResourcePoolReducer,
    ExtraObject:ExtraReducer,
    GenRequest:GenRequestReducer,
    SpecRequest:SpecRequestReducer,
    Report:ReportReducer,
    Notification:NotifiReducer
})
export default rootReducer