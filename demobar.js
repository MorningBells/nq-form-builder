import React from "react";
import store from './src/stores/store'
import ReactFormGenerator from './src/form';

export default class Demobar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false
    }

    const update = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);

    store.subscribe(state => update(state.data));
  }

  showPreview() {
    this.setState({
      previewVisible: true
    })
  }

  showShortPreview() {
    this.setState({
      shortPreviewVisible: true
    })
  }

  showRoPreview() {
    this.setState({
      roPreviewVisible: true
    })
  }

  closePreview() {
    this.setState({
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false
    })
  }

  _onChange(data) {
    this.setState({
      data: data
    });
  }

  _onSubmit(data) {
    console.log('onSubmit', data);
    // Place code to post json data to server here
  }

  render() {
    var modalClass = 'modal';
    if(this.state.previewVisible) {
      modalClass += ' show';
    }

    var shortModalClass = 'modal short-modal';
    if(this.state.shortPreviewVisible) {
      shortModalClass += ' show';
    }

    var roModalClass = 'modal ro-modal';
    if(this.state.roPreviewVisible) {
      roModalClass += ' show';
    }

    return(
      <div className="clearfix" style={{margin:'10px'}}>
        <div className="questionnaire_sub_nav pull-left">
          <a class="nav_item current" href="javascript:;" onClick={this.showPreview.bind(this)}>编辑</a>
          <a class="nav_item" href="javascript:;" onClick={this.showPreview.bind(this)}>主题</a>
          <a class="nav_item disabled" href="javascript:;" onClick={this.showPreview.bind(this)}>设置</a>
          <a class="nav_item disabled" href="javascript:;" onClick={this.showPreview.bind(this)}>投放</a>
          <a class="nav_item disabled" href="javascript:;" onClick={this.showPreview.bind(this)}>统计</a>
        </div>

        <div className="pull-right">
        <button className="btn btn-primary pull-right" style={{ marginRight: '10px'}} onClick={this.showPreview.bind(this)}>表单预览</button>
        </div>

        { this.state.previewVisible &&
          <div className={modalClass}>
            <div className="modal-dialog">
              <div className="modal-content">
                <ReactFormGenerator
                  download_path=""
                  back_action="/"
                  back_name="Back"
                  answer_data={{}}
                  action_name="Save"
                  form_action="/"
                  form_method="POST"
                  // onSubmit={this._onSubmit}
                  variables={this.props.variables}
                  data={this.state.data} />

                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closePreview.bind(this)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        }

        { this.state.roPreviewVisible &&
          <div className={roModalClass}>
            <div className="modal-dialog">
              <div className="modal-content">
                <ReactFormGenerator
                  download_path=""
                  back_action="/"
                  back_name="Back"
                  answer_data={{}}
                  action_name="Save"
                  form_action="/"
                  form_method="POST"
                  read_only={true}
                  variables={this.props.variables}
                  hide_actions={true} data={this.state.data} />

                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closePreview.bind(this)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        }


        { this.state.shortPreviewVisible &&
          <div className={shortModalClass}>
            <div className="modal-dialog">
              <div className="modal-content">
                <ReactFormGenerator
                  download_path=""
                  back_action=""
                  answer_data={{}}
                  form_action="/"
                  form_method="POST"
                  data={this.state.data}
                  display_short={true}
                  variables={this.props.variables}
                  hide_actions={false} />

                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closePreview.bind(this)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }

}
