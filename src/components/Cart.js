import React from 'react';
import MinMax from './Counter';

export default class extends React.Component {

    remove(i) {
        const products = this.props.products.filter((pr, index) => index !== i);
        this.props.changeProducts(products)
    }

    sendOrder = ()  => {
        this.props.changeOrderDone(true);
    }

    changeCnt(i, cnt) {
        const products = [...this.props.products];
        products[i] = {...products[i], cnt};
        this.props.changeProducts(products);
    }

    render () {
        const {total, products} = this.props;
        const tableRows = products.map((product, i) => {
            return (
                <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>
                        <MinMax max={product.rest}
                                min={0}
                                current={product.cnt}
                                onChange={cnt => this.changeCnt(i, cnt)}
                        />
                    </td>
                    <td width="120">{product.cnt * product.price}</td>
                    <td>
                        <button className="btn btn-dark" onClick={() => this.remove(i)}>Delete</button>
                    </td>
                </tr>
            );
        });
        return (
            <div>
                <div className="row">
                    <div className="col-lg-6 col-12">
                        <h2 className="text-center">Cart</h2>
                        <table className="table table-bordered table-striped text-center">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Count</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableRows}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <srtong className="h4 mr-2">Total: {total}</srtong>
                    <button className="btn btn-dark btn" onClick={this.sendOrder} disabled={total <= 0}>
                        Send
                    </button>
                </div>
                
            </div>
        )
    }
        
}