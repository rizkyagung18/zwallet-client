import React, { Component } from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import Support from '../../icons/landing/support.svg'
import Privacy from '../../icons/landing/privacy.svg'
import Download from '../../icons/landing/download.svg'
import { Link } from 'react-router-dom'

const Header = styled.header`
    background: url('https://i.ibb.co/t2f417f/Mask-Group.png');
    padding: 55px 150px 0 150px;
`

const Logo = styled.p`
    font-weight: bold;
    font-size: ${props => props.size};
    margin-bottom: ${props => props.bottom};
    color: #FFFFFF;
`

const Typo = styled.h1`
    color: ${props => props.color };
    font-size: 60px;
    font-weight: 800;
    margin-bottom: 40px;
`

const Desc = styled.p`
    font-size: 18px;
    color: ${props => props.color};
    margin-bottom: 50px;
`

const ButtonLanding = styled.button`
    background-color: ${props => props.primary ? '#6379F4' : '#FFFFFF'};
    color: ${props => props.primary ? '#FFFFFF' : '#6379F4'};
    width: ${props => props.width || '120px'};
    border: 2px solid ${props => props.primary ? '#FFFFFF' : '#6379F4'};
    outline: #6379F4;
    border-radius: 12px;
    padding: 16px;
    font-size: 18px;
    font-weight: bold;
`

const Left = styled.div`
    flex: 1;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const Partner = styled.div`
    background-color: rgba(71, 58, 209, 0.06);
    margin-bottom: 120px;
`

const About = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center
`

const Card = styled.div`
    background-color: #FFFFFF;
    box-shadow: 0px 4px 250px rgba(172, 172, 172, 0.15);
    border-radius: ${props => props.radius};
    padding: ${props => props.space};
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: ${props => props.center ? 'center' : 'flex-start'};
`

const TitleCard = styled.span`
    font-size: ${props => props.size};
    font-weight: bold;
    color: #3A3D42;
    margin-top: ${props => props.top};
`

const DescCard = styled.p`
    color: rgba(58, 61, 66, 0.9);
    font-size: 18px;
    margin-top: ${props => props.top};
    margin-bottom: 0px;
`

class Landing extends Component {
    constructor(props) {
        super()
        this.state = {
            name: ''
        }
    }
    render() {
        return (
            <main className="bg-white">
                <Header>
                    <Container className="d-flex flex-lg-row flex-column">
                        <Left>
                            <Logo size="29px" bottom="140px">
                                Zwallet
                            </Logo>
                            <Typo color="#FFFFFF">
                                Awesome App For Saving Time.
                            </Typo>
                            <Desc color="#FFFFFF">
                                We bring you a mobile app for banking problems that oftenly wasting much of your times.
                            </Desc>
                            <Link to="/auth/register">
                                <ButtonLanding className="mb-3" width="173px">
                                    Try It Free
                                </ButtonLanding>
                            </Link>
                        </Left>
                        <Right>
                            <div className="d-none d-md-block" style={{ alignSelf: 'flex-end', marginBottom: '40px', position: 'absolute', top: '40px'}}>
                                <Link to="/auth/login">
                                    <ButtonLanding primary className="mr-3">Login</ButtonLanding>
                                </Link>
                                <Link to="/auth/register">
                                    <ButtonLanding>Sign Up</ButtonLanding>
                                </Link>
                            </div>
                            <img className="d-none d-md-block" src="https://i.ibb.co/SwdWWkK/Phone-Header.png" alt="phone" />
                        </Right>
                    </Container>
                </Header>
                <Partner>
                    <Container style={{paddingTop: '90px', paddingBottom: '90px'}}>
                        <img width="100%" src="https://i.ibb.co/4KTJW00/Logo.png" alt="partner" />
                    </Container>
                </Partner>
                <Container>
                    <About>
                        <Typo color="#6379F4">
                            About <span className="text-dark">the Application.</span>
                        </Typo>
                        <Desc color="#3A3D42">
                            We have some great features from the application and it’s totally free to use by all users around the world.
                        </Desc>
                        <div style={{ marginBottom: '120px'}} className="d-flex flex-lg-row flex-column">
                            <Card space="40px 30px 40px 30px" radius="25px" center>
                                <img src={Support} alt="phone" />
                                <TitleCard size="24px" top="35px">
                                    24/7 Support
                                </TitleCard>
                                <DescCard top="35px">
                                    We have 24/7 contact support so you can contact us whenever you want and we will respond it.
                                </DescCard>
                            </Card>
                            <Card space="40px 30px 40px 30px" radius="25px" center>
                                <img src={Privacy} alt="phone" />
                                <TitleCard size="24px" top="35px">
                                    Data Privacy
                                </TitleCard>
                                <DescCard top="35px">
                                    We make sure your data is safe in our database and we will encrypt any data you submitted to us.
                                </DescCard>
                            </Card>
                            <Card space="40px 30px 40px 30px" radius="25px" center>
                                <img src={Download} alt="phone" />
                                <TitleCard size="24px" top="35px">
                                    Easy Download
                                </TitleCard>
                                <DescCard top="35px">
                                    Zwallet is 100% totally free to use it’s now available on Google Play Store and App Store.
                                </DescCard>
                            </Card>
                        </div>
                    </About>
                </Container>
                <Partner>
                    <Container className="d-flex flex-lg-row flex-column">
                        <img src="https://i.ibb.co/6FQ8VpZ/Phone-Feature.png" alt="feature" />
                        <div style={{margin: '174px auto'}}>
                            <Typo color="#3A3D42">
                                All The <span className="text-primary">Great</span> Zwallet Features.
                            </Typo>
                            <div className="d-flex flex-column">
                                <Card space="25px" radius="25px">
                                    <TitleCard size="20px">
                                        <span className="text-primary">1.</span> Small Fee
                                    </TitleCard>
                                    <DescCard top="15px">
                                        We only charge 5% of every success transaction done in Zwallet app.
                                    </DescCard>
                                </Card>
                                <Card space="25px" radius="25px">
                                    <TitleCard size="20px">
                                        <span className="text-primary">2.</span> Data Secured
                                    </TitleCard>
                                    <DescCard top="15px">
                                        All your data is secured properly in our system and it’s encrypted.
                                    </DescCard>
                                </Card>
                                <Card space="25px" radius="25px">
                                    <TitleCard size="20px">
                                        <span className="text-primary">3.</span> User Friendly
                                    </TitleCard>
                                    <DescCard top="15px">
                                        Zwallet come up with modern and sleek design and not complicated.
                                    </DescCard>
                                </Card>
                            </div>
                        </div>
                    </Container>
                </Partner>
                <Container>
                    <About>
                        <Typo color="#3A3D42">
                            What Users are <span className="text-primary">Saying.</span>
                        </Typo>
                        <Desc color="#3A3D42">
                            We have some great features from the application and it’s totally free to use by all users around the world.
                        </Desc>
                        <div style={{ marginBottom: '120px'}} className="d-flex flex-lg-row flex-column">
                            <Card space="40px 30px 40px 30px" radius="30px" center>
                                <img src={Support} alt="phone" />
                                <TitleCard size="24px">
                                    Alex Hansinburg
                                </TitleCard>
                                <DescCard top="35px">
                                    Designer
                                </DescCard>
                                <DescCard top="35px">
                                    “This is the most outstanding app that I’ve ever try in my live, this app is such an amazing masterpiece and it’s suitable for you who is bussy with their bussiness and must transfer money to another person aut there. Just try this app and see the power!”
                                </DescCard>
                            </Card>
                        </div>
                    </About>
                </Container>
                <footer className="bg-primary">
                    <Container style={{paddingTop: '80px', paddingBottom: '80px'}}>
                        <Logo size="36px">Zwallet</Logo>
                        <Desc color="rgba(239, 239, 239, 0.75)">
                            Simplify financial needs and saving much time in banking needs with one single app.
                        </Desc>
                        <hr style={{backgroundColor: 'rgba(255, 255, 255, 0.6)'}}/>
                        <div className="d-flex justify-content-between">
                            <Desc color="rgba(239, 239, 239, 0.9);">2020 Zwallet. All right reserved.</Desc>
                            <div className="d-flex justify-content-between">
                                <Desc color="#EFEFEF" className="mr-4">+62 5637 8882 9901</Desc>
                                <Desc color="#EFEFEF">contact@zwallet.com</Desc>
                            </div>
                        </div>
                    </Container>
                </footer>
            </main>
        )
    }
}

export default Landing