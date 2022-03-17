import styled from 'styled-components';
import { Grid, GridItem } from '../shared/grid/Grid';
import { WithPageContainer } from '../shared/page-container/PageContainer';

const StyledHeading = styled.h2`
        margin: 0;
    `;

const StyledParagraph = styled.p`
        margin: 8px 0;
    `;

export const Library = (props: any) => {
    return (
        <>
            <p>Technical library page
            Showcase of working parts of watch
            Animated with descriptions</p>

            <Grid>
                <GridItem>
                    <StyledHeading>Barrel</StyledHeading>
                    <StyledParagraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Maxime recusandae quos laborum, minima sequi, vero quidem quis 
                        inventore doloremque aspernatur veniam, rem ipsam? Dicta, velit libero 
                        iure veniam ad voluptatem.</StyledParagraph>
                </GridItem>

                <GridItem>
                    <StyledHeading>Click spring</StyledHeading>
                    <StyledParagraph>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Maxime recusandae quos laborum, minima sequi, vero quidem quis
                            inventore doloremque aspernatur veniam, rem ipsam? Dicta, velit libero
                        iure veniam ad voluptatem.</StyledParagraph>
                </GridItem>

                <GridItem>
                    <StyledHeading>Balance wheel</StyledHeading>
                    <StyledParagraph>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Maxime recusandae quos laborum, minima sequi, vero quidem quis
                            inventore doloremque aspernatur veniam, rem ipsam? Dicta, velit libero
                        iure veniam ad voluptatem.</StyledParagraph>
                </GridItem>
                <GridItem>
                    <StyledHeading>Balance cock</StyledHeading>
                    <StyledParagraph>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Maxime recusandae quos laborum, minima sequi, vero quidem quis
                            inventore doloremque aspernatur veniam, rem ipsam? Dicta, velit libero
                        iure veniam ad voluptatem.</StyledParagraph>
                </GridItem>
                <GridItem>
                    <StyledHeading>Escape wheel</StyledHeading>
                    <StyledParagraph>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Maxime recusandae quos laborum, minima sequi, vero quidem quis
                            inventore doloremque aspernatur veniam, rem ipsam? Dicta, velit libero
                        iure veniam ad voluptatem.</StyledParagraph>
                </GridItem>
                <GridItem>
                    <StyledHeading>Winding rotor</StyledHeading>
                    <StyledParagraph>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Maxime recusandae quos laborum, minima sequi, vero quidem quis
                            inventore doloremque aspernatur veniam, rem ipsam? Dicta, velit libero
                        iure veniam ad voluptatem.</StyledParagraph>
                </GridItem>
                <GridItem>
                    <StyledHeading>Bridge</StyledHeading>
                    <StyledParagraph>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Maxime recusandae quos laborum, minima sequi, vero quidem quis
                            inventore doloremque aspernatur veniam, rem ipsam? Dicta, velit libero
                        iure veniam ad voluptatem.</StyledParagraph>
                </GridItem>
                <GridItem>
                    <StyledHeading>Centre wheel</StyledHeading>
                    <StyledParagraph>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Maxime recusandae quos laborum, minima sequi, vero quidem quis
                            inventore doloremque aspernatur veniam, rem ipsam? Dicta, velit libero
                        iure veniam ad voluptatem.</StyledParagraph>
                </GridItem>
                <GridItem>
                    <StyledHeading>Third wheel</StyledHeading>
                    <StyledParagraph>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Maxime recusandae quos laborum, minima sequi, vero quidem quis
                            inventore doloremque aspernatur veniam, rem ipsam? Dicta, velit libero
                        iure veniam ad voluptatem.</StyledParagraph>
                </GridItem>
                <GridItem>
                    <StyledHeading>Fourth wheel</StyledHeading>
                    <StyledParagraph>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Maxime recusandae quos laborum, minima sequi, vero quidem quis
                            inventore doloremque aspernatur veniam, rem ipsam? Dicta, velit libero
                        iure veniam ad voluptatem.</StyledParagraph>
                </GridItem>
            </Grid>
        </>
    )
}

export const LibraryWithPageContainer = WithPageContainer(Library);
