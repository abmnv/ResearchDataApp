import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

export var CreateProject = React.createClass({

  handleCreateProject (e) {
    e.preventDefault();

    const {dispatch} = this.props;

    const title = this.refs.title.value;
    const description = this.refs.description.value;
    const fileList = $.extend(true, [], this.refs.fileUploader.files);
    const logoImage = this.refs.logoImage.files;

    //console.log('title:', title);
    //console.log('description', description);

    if(title && description){
      // this.refs.title.value = '';
      // this.refs.description.value = '';
      // this.refs.fileUploader.value = '';
      console.log('logoImage:', logoImage);
      dispatch(actions.startAddProject(title, description, logoImage[0], fileList)).then(() => {
        this.props.history.push('/');
      });
    }
  },

  handleCancel (e) {
    e.preventDefault();
    this.props.history.push('/edit_projects');
  },

  render () {
    return (
      <div className="create-project">
        <div className="row">
          <label htmlhtmlFor="title" className="column small-3">
            Title:
          </label>
          <div className="column small-9">
            <input type="text" name="title" ref="title" placeholder="My awesome project"></input>
          </div>
        </div>
        <div className="row">
          <label htmlFor="description" className="column small-3">
            Description:
          </label>
          <div className="column small-9">
            <textarea name="description" ref="description" rows="3" placeholder="Description of my awesome project"></textarea>
          </div>
        </div>
        <div className="row">
          <label htmlFor="logoImage" className="column small-3">
            Logo image:
          </label>
          <div className="column small-9">
            <input type="file" name="logoImage" ref="logoImage"></input>
          </div>
        </div>
        <div className="row">
          <label htmlFor="fileUploader" className="column small-3">
            Attach files:
          </label>
          <div className="column small-9">
            <input type="file" name="fileUploader" ref="fileUploader" multiple="multiple"></input>
          </div>
        </div>
        <div className="row control-bar">
          <div className="column small-5">
            <button  className="button expanded alert" onClick={this.handleCancel}>Cancel</button>
          </div>
          <div className="column small-5 small-offset-2">
            <button  className="button expanded" onClick={this.handleCreateProject}>Create</button>
          </div>
        </div>
      </div>
    )
  }
});

export default connect()(CreateProject);
