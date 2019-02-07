import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const ListBox = ({status, data, style, curName, clickEvt})=>{
    // status: 0: ready, 1: loading
    // data: array of {name, value}
    // curName: string
    // style: height and width
    function ListBoxClick(evt){
        let target = evt.target;
        if (target.tagName != "BUTTON"){
            return;
        }
        let evtParent = evt.target.parentNode;
        let siblings = [ ...evtParent.children ].filter(c => c.nodeType == 1 && c != evt.target);
        siblings.forEach(sibling=>{
            sibling.classList.remove('active');
        })
        evt.target.classList.add('active');
        clickEvt.call(this, evt.target.name);
    }
    let content;
    if (status == 0){
        content = data.map(d=>{
            let className = "list-group-item list-group-item-action";
            if (d.name==curName){
                className += " active";
            }
            return <button type="button" key={d.name} title={d.title} className={className} name={d.name}>{d.value}</button>
        });
    } else {
        content = 
        <div title="Requesting..." className="centerInParent">
            <FontAwesomeIcon icon="spinner" size="6x" spin />
        </div>
    }
    return <div className="list-group" style={style} onClick={ListBoxClick}>
        {content}
    </div>
}

export default ListBox;