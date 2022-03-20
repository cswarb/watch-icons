import styled from 'styled-components';
import { Grid, GridItem } from '../shared/grid/Grid';
import { WithPageContainer } from '../shared/page-container/PageContainer';



export const ArrowOpenIcon = ({dark, ...props}: any) => {
    return (
        <div {...props} className="arrow-button">
            {dark ? <img src="https://img.icons8.com/ios-filled/100/grey/open-in-popup.png" /> : <img src="https://img.icons8.com/ios-filled/100/ffffff/open-in-popup.png" />}
        </div>
    )
}


export const Library = (props: any) => {
    function click(e: any) {
        console.log('clicked', e);
    }

    return (
        <div style={{
            display: 'flex',
            gap: '32px',
            flexFlow: 'row nowrap',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
        }}>
            {/* <p>Technical library page
            Showcase of working parts of watch
            Animated with descriptions</p> */}

            <div style={{ flex: '1'}}>
                <GridItem style={{
                    background: '#181922',
                    color: 'white',
                    flex: '1'
                }}>
                    <div className="watch-section-title">Balance wheel</div>
                    <div className="watch-section-content">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maxime recusandae quos laborum, minima sequi, vero quidem quis
                        inventore doloremque aspernatur veniam, rem ipsam? Dicta, velit libero
                        iure veniam ad voluptatem.</div>
                    <ArrowOpenIcon></ArrowOpenIcon>
                </GridItem>
            </div>

            <Grid style={{ flex: '2' }}>
                <GridItem>
                    <div className="watch-section-title">Barrel</div>
                    <div className="watch-section-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Maxime recusandae quos laborum, minima sequi, vero quidem quis 
                        inventore doloremque aspernatur veniam, rem ipsam? Dicta, velit libero 
                        iure veniam ad voluptatem.</div>
                </GridItem>

                <GridItem>
                    <div className="watch-section-title">Click spring</div>
                    <div className="watch-section-content">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Maxime recusandae quos laborum, minima sequi, vero quidem quis
                            inventore doloremque aspernatur veniam, rem ipsam? Dicta, velit libero
                        iure veniam ad voluptatem.</div>
                </GridItem>

                <GridItem>
                    <div className="watch-section-title">Balance cock</div>
                    <div className="watch-section-content">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Maxime recusandae quos laborum, minima sequi, vero quidem quis
                            inventore doloremque aspernatur veniam, rem ipsam? Dicta, velit libero
                        iure veniam ad voluptatem.</div>
                </GridItem>
                <GridItem>
                    <div className="watch-section-title">Escape wheel</div>
                    <div className="watch-section-content">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Maxime recusandae quos laborum, minima sequi, vero quidem quis
                            inventore doloremque aspernatur veniam, rem ipsam? Dicta, velit libero
                        iure veniam ad voluptatem.</div>
                </GridItem>
                <GridItem>
                    <div className="watch-section-title">Winding rotor</div>
                    <div className="watch-section-content">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Maxime recusandae quos laborum, minima sequi, vero quidem quis
                            inventore doloremque aspernatur veniam, rem ipsam? Dicta, velit libero
                        iure veniam ad voluptatem.</div>
                </GridItem>
                <GridItem>
                    <div className="watch-section-title">Bridge</div>
                    <div className="watch-section-content">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Maxime recusandae quos laborum, minima sequi, vero quidem quis
                            inventore doloremque aspernatur veniam, rem ipsam? Dicta, velit libero
                        iure veniam ad voluptatem.</div>
                </GridItem>
                <GridItem>
                    <div className="watch-section-title">Centre wheel</div>
                    <div className="watch-section-content">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Maxime recusandae quos laborum, minima sequi, vero quidem quis
                            inventore doloremque aspernatur veniam, rem ipsam? Dicta, velit libero
                        iure veniam ad voluptatem.</div>
                </GridItem>
                <GridItem>
                    <div className="watch-section-title">Third wheel</div>
                    <div className="watch-section-content">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Maxime recusandae quos laborum, minima sequi, vero quidem quis
                            inventore doloremque aspernatur veniam, rem ipsam? Dicta, velit libero
                        iure veniam ad voluptatem.</div>
                </GridItem>
                <GridItem>
                    <div className="watch-section-title">Fourth wheel</div>
                    <div className="watch-section-content">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Maxime recusandae quos laborum, minima sequi, vero quidem quis
                            inventore doloremque aspernatur veniam, rem ipsam? Dicta, velit libero
                        iure veniam ad voluptatem.</div>
                </GridItem>
            </Grid>
        </div>
    )
}

export const LibraryWithPageContainer = WithPageContainer(Library);
