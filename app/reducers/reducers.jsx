import moment from 'moment';

/* Note that myFile is an object that contains file DOM object and progress variable*/
export var fileUploadListReducer = (state = [], action) => {
  switch(action.type){
    case 'SET_FILE_UPLOAD_LIST':
      return action.fileList;
    case 'UPDATE_FILE_UPLOAD_PROGRESS':
      return state.map((myFile) => {
        if(myFile.file.name === action.name){
          return {
            file: myFile.file,
            progress: action.progress
          }
        }else{
          return myFile;
        }
      });
    case 'DELETE_FILE_FROM_UPLOAD_LIST':
      return state.filter((myFile) => {
        return myFile.file.name !== action.name;
        // if(myFile.file.name !== action.name){
        //   return myFile
        // }
      });
    default:
      return state
  }
}

export var projectReducer = (state = [], action) => {
  switch(action.type){
    case 'ADD_PROJECT':
      return [
        ...state,
        action.project
      ]
    case 'ADD_PROJECTS':
      return [
        ...state,
        ...action.projects
      ]
    case 'UPDATE_PROJECT':
      return state.map((project) => {
        if(project.id === action.project.id){
          var files = [
            ...project.files,
            ...action.project.files
          ]
          return {...project, ...action.project, files}
        }else{
          return project
        }
      });
    case 'DELETE_PROJECT':
      return state.filter((project) => {
        return project.id === action.id ? false : true;
      });
    case 'DELETE_FILE':
      return state.map((project) => {
        if(project.id === action.projectId){
          var files = project.files.filter((file) => {
            return !(file.id === action.fileId);
          });
          return {
            ...project,
            files
          }
        }else{
          return project;
        }
      })
    default:
      return state;
  }
}

export const authReducer = (state = {isAuth: false, error: null, role: null}, action) => {
  switch(action.type) {
    case 'AUTH_USER':
      return {
        ...state,
        isAuth: true,
        error: null,
        role: action.role
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        error: action.error
      }
    case 'LOG_OUT':
      return {
        ...state,
        isAuth: false,
        error: null,
        role: null
      }
    default:
      return state;
  }
}

// export var setLoginStatus = (state = false, action) => {
//   switch(action.type) {
//     case 'SET_LOGIN_STATUS':
//       return action.status;
//     default:
//       return state;
//   }
// }

export var activeProjectReducer = (state = '', action) => {
  switch(action.type){
    case 'SET_ACTIVE_PROJECT':
      return action.id;
    default:
      return state;
  }
}

export var editModeStatusReducer = (state = false, action) => {
  switch(action.type) {
    case 'CHANGE_EDIT_MODE_STATUS':
      return action.status;
    default:
      return state;
  }
}

export var setLoadingStatusReducer = (state = false, action) => {
  switch(action.type) {
    case 'SET_LOADING_STATUS':
      return action.status;
    default:
      return state;
  }
}

export var setSearchText = (state = '', action) => {
  switch(action.type) {
    case 'SET_SEARCH_TEXT':
      return action.text;
    default:
      return state;
  }
}

export const setRedirectUrl = (state = '/', action) => {
  switch(action.type) {
    case 'SET_REDIRECT_URL':
      return action.url;
    default:
      return state
  }
}

export const modalReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_CURRENT_MODAL':
      return action.currentModal;
    default:
      return state;
  }
}
