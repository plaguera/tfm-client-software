import * as React from 'react';
import Markdown from 'react-markdown';
import '../stylesheets/components/editor.scss';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Avatar from './Avatar';
import { EditorProps } from '../props';
import { getCookie } from '../util';

const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://plaguera-github-comments.herokuapp.com/' : 'http://localhost:8000/';
const AUTH_URL = BASE_URL + 'authorize/';

class Editor extends React.Component<EditorProps, { text: string }> {

    private ref = React.createRef<HTMLTextAreaElement>();

    constructor(props: EditorProps) {
        super(props);
        this.state = {
            text: ''
        }
        this.onComment = this.onComment.bind(this);
    }

    handleClick(e: any) {
        this.setState({ text: this.ref.current?.value || '' });
    }

    onComment() {
        this.setState({ text: this.ref.current?.value || '' }, () => {
            this.props.onComment(this.state.text);
            if (this.ref.current) this.ref.current.value = '';
        });
    }

    render() {
        if (getCookie('loggedin')) {
            return (
                <div className='editor-wrapper'>
                    <Avatar {...this.props.user}/>
                    <div className="editor arrow-box">
                        <Tabs forceRenderTabPanel={true}>
                            <TabList>
                                <Tab>Write</Tab>
                                <Tab onClick={this.handleClick.bind(this)}>Preview</Tab>
                            </TabList>

                            <TabPanel>
                                <div className="editor-textarea" id="tab-editor">
                                    <textarea placeholder="Leave a comment" id="textarea-comment" ref={this.ref}></textarea>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="editor-preview" id="tab-preview">
                                    <div className="markdown-render">
                                        <Markdown source={this.state.text} />
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <div className="editor-buttons">
                            <button className="btn btn-primary" id="btn-comment" onClick={this.onComment}>
                                Comment
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='editor-wrapper'>
                    <div className='editor'>
                        <Tabs>
                            <TabList>
                                <Tab>Write</Tab>
                                <Tab disabled>Preview</Tab>
                            </TabList>

                            <TabPanel>
                                <div className="editor-textarea" id="tab-editor">
                                    <textarea placeholder="Leave a comment" disabled></textarea>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="editor-preview" id="tab-preview">
                                    <div className="markdown-render"></div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <div className="editor-buttons">
                            <a className="btn btn-primary" href={AUTH_URL}>
                                Sign In
                            </a>
                        </div>
                    </div>
                </div>
            );
        }

    }
}

export default Editor