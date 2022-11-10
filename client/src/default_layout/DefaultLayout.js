import { Layout } from 'antd';
import logoCircle from "../static/images/logo_circle.png"

const DefaultLayout = (props) => {
    return (
        <Layout>
            <Layout.Header className='layout-header'>
                <h1>
                    <img src={logoCircle} className="logo" alt="Purse-logo" />
                    Purse
                </h1>
            </Layout.Header>

            <Layout.Content className='layout-content'>
                {/* table ? props.children[0] : props.children[1]
                    props.children[0] is table
                    props.children[1] is graph
                */}
                {props.children}
            </Layout.Content>

            {/* no need for a footer */}
            {/* <Layout.Footer className='layout-footer'>
                Purse
            </Layout.Footer> */}
        </Layout>
    );
}

export default DefaultLayout;