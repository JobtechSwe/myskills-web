import React, { useEffect } from 'react'
import { OpenInApp } from 'components/ButtonLink'
import styled from '@emotion/styled'
import Flex from './Flex'
import Grid from './Grid'
import logotypeIcon from '../assets/images/logo.svg'
import egendataLogotypeIcon from '../assets/icons/egendata_logo.svg'
import egendataLogotypeIconWhite from '../assets/icons/egendata_logo_white.svg'
import { H3, Paragraph } from './Typography'
import Info from './Info'
import { Link } from './Link'
import check from '../assets/icons/check_blue.svg'
import { ConsentApprovedSubscription } from 'generated/myskills'
import { useSubscription } from 'react-apollo-hooks'
import { CONSENT_SUBSCRIPTION } from 'views/CreateProfile/SaveCV'
import { LOGIN_SUBSCRIPTION } from 'views/Login/Login'
import QR from 'components/QR'

interface LoginViewProps {
  onConsentApproved?: (onConsentApproved: any) => void
  loginUrl: string
  btnText: string
  consentId: string
  isLogin?: boolean
}

const Wrapper = styled.div`
  align-items: center;
  background: ${({ theme }) => `radial-gradient(
    647.69px at 6.66% 96.53%,
    ${theme.colors.yourPink} 0%,
    ${theme.colors.seashellPeach} 100%
  )`};
  display: flex;
  justify-content: center;
  padding: 25px;
`

const LogosWrapper = styled.div`
  margin: 25px 0;
  text-align: center;
`

const Image = styled.img`
  margin-top: 1px;
  margin-left: 7px;
`

const InfoBulletsWrapper = styled.div`
  margin: 40px 0;
  padding: 0 30px;
`

const EgenData: React.FC<LoginViewProps> = ({
  loginUrl,
  btnText,
  onConsentApproved,
  consentId,
  isLogin = false,
}) => {
  const { data } = useSubscription<ConsentApprovedSubscription>(
    isLogin ? LOGIN_SUBSCRIPTION : CONSENT_SUBSCRIPTION,
    {
      variables: {
        [isLogin ? 'loginRequestId' : 'consentRequestId']: consentId,
      },
    }
  )

  useEffect(() => {
    data && onConsentApproved(data)
  }, [data, onConsentApproved])

  return (
    <>
      <Wrapper>
        <Flex
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <LogosWrapper>
            <img alt="logo" src={logotypeIcon} />
            <Paragraph mb={10} mt={10}>
              vill öppna
            </Paragraph>
            <img alt="egendatalogo" src={egendataLogotypeIcon} />
          </LogosWrapper>
          <OpenInApp url={loginUrl}>
            {btnText}
            <Image alt="egendatalogo" src={egendataLogotypeIconWhite} />
          </OpenInApp>

          <Paragraph mb={20} mt={20}>
            eller scanna QR-koden nedan:
          </Paragraph>
          <QR consentId={loginUrl} />

          <InfoBulletsWrapper>
            <Grid gridTemplateColumns="20px 1fr">
              <img alt="check" src={check} />
              <div>
                <H3 color="black" fontSize={16} fontWeight="bold" mb="small">
                  Få kontroll över din data
                </H3>
                <Paragraph color="black" mb="large" mt="small">
                  Genom Egendata väljer du själv var din information ska sparas.
                </Paragraph>
              </div>
            </Grid>
            <Grid gridTemplateColumns="20px 1fr">
              <img alt="check" src={check} />
              <div>
                <H3 color="black" fontSize={16} fontWeight="bold" mb="small">
                  Spara tid
                </H3>
                <Paragraph color="black" mb="large" mt="small">
                  Hämta och dela din information istället för att skapa ett nytt
                  CV för varje jobbsökarsajt.
                </Paragraph>
              </div>
            </Grid>
          </InfoBulletsWrapper>
          <Info>
            <Link textDecoration="underline">
              Läs mer om hur Egendata fungerar
            </Link>
          </Info>
        </Flex>
      </Wrapper>
    </>
  )
}

export default EgenData
