import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function Dashboard() {
    const storedMaxIndex = localStorage.getItem('maxIndex');
    const maxlen_Products = localStorage.getItem('maxlen_Products');
    const maxlen_users = localStorage.getItem('maxlen_users');

    // Assuming you have the counts available as numbers
    const productsCount = parseInt(maxlen_Products, 10) || 0;
    const usersCount = parseInt(maxlen_users, 10) || 0;
    const vendorsCount = parseInt(storedMaxIndex, 10) || 0;

    // Bar chart data
    const data = {
        labels: ['Products', 'Users', 'Vendors'],
        datasets: [
            {
                label: 'Count',
                backgroundColor: ['#b084cc', '#e85f5c', '#acf39d'],
                borderColor: 'rgba(0, 123, 255, 0.7)',
                borderWidth: 0,
                hoverBackgroundColor: '#b084cc',
                data: [productsCount, usersCount, vendorsCount],
                barThickness: 50,
            },
        ],
    };

    // Bar chart options
    const options = {
        scales: {
            y: {
                type: 'linear',
                beginAtZero: true,
            },
        },
    };
const uname=localStorage.getItem('uname')
    return (
        <div className="container-fluid font_Fam d-flex justify-content-center flex-column align-items-center">
            <h2 className='py-4'>Welcome <span className='brand_logo fw-bold'>{uname}</span>  </h2>
            {/* to <span className='fw-bold'> Admin<span className='brand_logo'>Zone</span></span> */}
            <Row className='mt-5'>
            <Col>
                    <Card className='cardStyle'>
                        <Card.Body>
                            <Card.Title className='fw-bold'>Dashboard</Card.Title>
                            <Card.Text>
                          You can manage various aspects of your application.
                            </Card.Text>
                            {/* <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link> */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className='cardStyle1'>
                    <Card.Body>
                            <Card.Title className='fw-bold'>Products <Badge bg="success">{maxlen_Products}</Badge></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                            <Card.Text>
                            Add, edit, or delete products in your inventory.
                            </Card.Text>
                            {/* <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link> */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className='cardStyle2'>
                        <Card.Body>
                            <Card.Title className='fw-bold'>Users <Badge bg="warning">{maxlen_users}</Badge></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                            <Card.Text>
                            Manage user accounts and profile information here.
                            </Card.Text>
                            {/* <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link> */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className='cardStyle3'>
                        <Card.Body>
                            <Card.Title className='fw-bold'>Vendors <Badge bg="primary">{storedMaxIndex}</Badge></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                            <Card.Text>
                            View and manage vendor details and contracts.
                            </Card.Text>
                            {/* <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link> */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* Bar Chart */}
            <div className='w-50 h-50 mb-5'>
            <Row className="mt-5">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Counts</Card.Title>
                            <Bar data={data} options={options} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row></div>
        </div>
    );
}

export default Dashboard;
