import React, { useState } from 'react'
import {Card, Col, Modal, Row} from 'react-bootstrap';
import { server_url } from '../services/server_url';



function ProjectCard({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
    {project&& <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`${server_url}/uploads/${project?.projectImage}`} onClick={handleShow}/>
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
       
      </Card.Body>
    </Card> 
}
    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
            <img src={`${server_url}/uploads/${project?.projectImage}`} width={"100%"} alt="" className='image-fluid'/>
            </Col>
            <Col md={6}>
            <h2 className='text-success'>{project?.title}</h2>
            <p><span className='fw-bolder'>Project Overview</span>:{project?.overview}</p>
            <p><span className='fw-warning'>Languages Used</span>:{project?.language}</p>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <div className='mt-2'>
            <a href={project?.github} target='_blank' className='me-3 btn text-dark'><i class="fa-brands fa-github fa-2x"></i></a>
            <a href={project?.website} target='_blank' className='me-3 btn text-dark'><i class="fa-solid fa-link fa-2x"></i></a>
          </div>
          
        </Modal.Footer>
      </Modal>





    </>
  )
}

export default ProjectCard
