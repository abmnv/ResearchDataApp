import firebase, {firebaseRef, firebaseStorageRef} from 'app/firebase/';
import moment from 'moment';

export var addProjects = (projects) => {
  return {
    type: 'ADD_PROJECTS',
    projects
  }
}

export var setActiveProject = (id) => {
  return {
    type: 'SET_ACTIVE_PROJECT',
    id
  }
}

export var changeEditModeStatus = (status) => {
  return {
    type: 'CHANGE_EDIT_MODE_STATUS',
    status
  }
}

export var deleteProject = (id) => {

  return {
    type: 'DELETE_PROJECT',
    id
  }
}

export var startDeleteProject = (id, files) => {

  return (dispatch, getState) => {
    var projectRef = firebaseRef.child('projects/' + id);

    var seq = Promise.resolve();

    files.forEach((myFile) => {
      seq = seq.then(() => {
        console.log('file name:', myFile.name, 'File:', myFile);
        return firebaseStorageRef.child(myFile.name).delete();
      });
    });

    return seq.then(() => {
      return projectRef.remove();
    }).then(() => {
      dispatch(deleteProject(id));
    });
  }
}

export var startAddProjects = () => {

  return (dispatch, getState) => {
    //console.log('inside startAddProjects');

    var projectsRef = firebaseRef.child('projects');

    projectsRef.once('value').then((snapshot) => {
      //console.log('shapshot:', snapshot.val());

      var firebaseProjects = snapshot.val() || {};

      var keys = Object.keys(firebaseProjects);
      var projects = keys.map((key) => {
        var projectFiles = firebaseProjects[key].files || {};
        var fileKeys = Object.keys(projectFiles);
        return {
          ...firebaseProjects[key],
          files: fileKeys.map((fKey) => {
            return {
              ...firebaseProjects[key].files[fKey],
              id: fKey
            }
          }),
          id: key
        }
      });

      dispatch(addProjects(projects));
    });
  }
}

export var addProject = (project) => {
  return {
    type: 'ADD_PROJECT',
    project
  }
}

export var updateProject = (project) => {
  return {
    type: 'UPDATE_PROJECT',
    project
  }
}

export var deleteFile = (projectId, fileId) => {
  return {
    type: 'DELETE_FILE',
    projectId,
    fileId
  }
}

export var startDeleteFile = (projectId, fileId, fileName) => {
  return (dispatch, getState) => {
    return firebaseStorageRef.child(fileName).delete().then(() => {
      return firebaseRef.child('projects/' + projectId + '/files/' + fileId).remove();
    }).then(() => {
      dispatch(deleteFile(projectId, fileId));
    }).catch((e) => {
      console.log('firebase error:', e);
    });
  }
}

export var startUpdateProject = (id, title, description, fileList) => {
  return (dispatch, getState) => {

    var project = {
      title,
      description
    }

    var myFiles = [];
    var fileInfo = {};
    var projectRef = firebaseRef.child('projects/' + id);

    return projectRef.update(project).then((snapshot) => {
      var seq = Promise.resolve();

      console.log('fileList inside actions:', fileList);

      fileList.forEach((myFile) => {
        seq = seq.then(() => {
          console.log('file name:', myFile.name, 'File:', myFile);
          return firebaseStorageRef.child(myFile.name).put(myFile);
        }).then((snapshot) => {
          fileInfo = {name: myFile.name, url: snapshot.downloadURL};
          return projectRef.child('files').push(fileInfo);
        }).then((snapshot) => {
          //console.log('snapshot.key:', snapshot.key)
          myFiles.push({...fileInfo, id: snapshot.key})
        });
      });

      return seq.then(() => {
        console.log('myFiles:', myFiles);
        dispatch(updateProject({...project, id, files: myFiles}));
      });
    });
  }
}

export var startAddProject = (title, description, fileList) => {
  return (dispatch, getState) => {

    var project = {
      title,
      description,
      createdAt: moment().unix(),
      files: null
    }

    var projectsRef = firebaseRef.child('projects');
    //var fileRef = firebaseStorageRef.child(project.fileName);
    var myFiles = [];
    var fileInfo = {};

    return projectsRef.push(project).then((projectSnapshot) => {

      var seq = Promise.resolve();

      console.log('fileList inside startAddProject actions:', fileList);

      fileList.forEach((myFile) => {
        seq = seq.then(() => {
          console.log('file name:', myFile.name, 'File:', myFile);
          return firebaseStorageRef.child(myFile.name).put(myFile);
        }).then((snapshot) => {
          fileInfo = {name: myFile.name, url: snapshot.downloadURL};
          return projectsRef.child(projectSnapshot.key + '/files').push(fileInfo);
        }).then((snapshot) => {
          //console.log('snapshot.key:', snapshot.key)
          myFiles.push({...fileInfo, id: snapshot.key})
        });
      });

      return seq.then(() => {
        console.log('myFiles:', myFiles);

        dispatch(addProject(
          {
            ...project,
            id: projectSnapshot.key,
            files: myFiles
          }
        ));
      });
    });

    // return fileRef.put(fileList[0]).then((snapshot) => {
    //   //console.log('download url', snapshot.downloadURL);
    //   //project.fileUrl = snapshot.downloadURL;
    //   return projectRef.push({...project, fileUrl: snapshot.downloadURL});
    // }).then((snapshot) => {
    //   dispatch(addProject(
    //     {
    //       ...project,
    //       id: snapshot.key
    //     }
    //   ));
    // });


    // fileRef.getDownloadURL().then((url) => {
    //   console.log('url:', url);
    // });

    // .then(() => {
    //   return fileRef.getDownloadURL();
    // }).then((url) => {
    //   report.fileUrl = url;
    //   return reportRef.push(report);
    // }).then(() => {
      // dispatch(addReport(
      //   {
      //     ...report,
      //     id: reportRef.key
      //   }
      // ));
    // });
  }
}
