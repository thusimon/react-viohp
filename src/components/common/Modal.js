import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({show, title, buttonClickHandler, children})=>{
    let modalClass = show ? "modal fade show" : "modal fade";
    //buttonControl should be an array ['cancel', 'ok']
    return (<div className={modalClass} id="exampleModalCenter" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalCenterTitle">{title}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" name="cancel" onClick={buttonClickHandler}>Cancel</button>
                    <button type="button" className="btn btn-primary" name="ok" onClick={buttonClickHandler}>OK</button>
                </div>
            </div>
        </div>
    </div>);
};

Modal.propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string,
    buttonClickHandler: PropTypes.func,
    children: PropTypes.object
};

export default Modal;