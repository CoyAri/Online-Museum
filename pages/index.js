import React from "react";
import { Container, Image, Row, Col } from "react-bootstrap";

export default function Home() {
  return (
    <Container>
      <Row>
        <Col>
          <Image className="rounded" src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" fluid />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <p>
            The Metropolitan Museum of Art in New York City, colloquially "the Met", is the largest art museum in the Americas. In 2022 it welcomed 3,208,832 visitors, ranking it eighth on the list of most-visited art museums in the world, and the second-most visited art museum in the United States. Its permanent collection contains over two million works,divided among 17 curatorial departments. The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park on Manhattan's Upper East Side, is by area one of the world's largest art museums. The first portion of the approximately 2-million-square-foot (190,000 m2) building was built in 1880. A much smaller second location, The Cloisters at Fort Tryon Park in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.
            <br /> <br />
            The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American people. The museum's permanent collection consists of works of art from classical antiquity and ancient Egypt, paintings, and sculptures from nearly all the European Old Masters, and an extensive collection of American and modern art. The Met maintains extensive holdings of African, Asian, Oceanian, Byzantine, and Islamic art. The museum is home to encyclopedic collections of musical instruments, costumes, and accessories, as well as antique weapons and armor from around the world. Several notable interiors, ranging from 1st-century Rome through modern American design, are installed in its galleries. &nbsp;
            <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Read more</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
