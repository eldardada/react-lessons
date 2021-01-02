import React from 'react';
import Cart from './Cart';
import Order from './Order';
import {all as getProducts} from '@/api/products';

export default class extends React.PureComponent {
    state = {
        products: getProducts(),
        orderDone: false,
    };

    changeProducts(products) {
        this.setState({products})
    }

    changeOrderDone(orderDone) {
        this.setState({orderDone})
    }

    render() {
        const {products, orderDone} = this.state;

        const total = products.reduce((total, product) => {
                return total + product.cnt * product.price;
        }, 0);
        
        let content;

        if(orderDone) {
            content = <Order total={total}/>
        }
        else {
            content =  <Cart total={total} 
                             changeOrderDone={orderDone => this.changeOrderDone(orderDone)} 
                             products={products}
                             changeProducts={products => this.changeProducts(products)}
                        /> 
        }

        return content;
    }
}