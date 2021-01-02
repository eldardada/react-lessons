import React from 'react';
import PropTypes from 'prop-types';

class Counter extends React.Component {
    static propTypes = {
        min: PropTypes.number,
        max: PropTypes.number.isRequired,
        onChange: PropTypes.func
    }

    state = {
        inputVal: this.props.current
    }

    static defaultProps = {
        min: 1,
        onChange: function() {}
    }
    
    onInput = e => {
        this.setState({inputVal: e.target.value});
    }
    
    onBlur = () => {
        let num = parseInt(this.state.inputVal);

        if(isNaN(num)) {
            num = this.props.min;
        }

		this.set(num);
    }

    set(newValue){
        let current = Math.min(Math.max(this.props.min, newValue), this.props.max);
        this.setState({inputVal: current});
		this.props.onChange(current);
	}

    increase = () => this.set(this.props.current + 1);
    decrease = () => this.set(this.props.current - 1);
    
    render() {
        const {min, max, current} = this.props;
        const {inputVal} = this.state;
        return (
            <div className="d-flex">
                <button className="btn btn-secondary" type="button" onClick={this.decrease} disabled={current <= min}>-</button>
                <input className="form-control text-center" type="text" value={inputVal} onBlur={this.onBlur} onChange={this.onInput}/>
                <button className="btn btn-secondary" type="button" onClick={this.increase} disabled={current >= max}>+</button>
            </div>
        );
    }
}

export default Counter;