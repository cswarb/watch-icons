import * as React from "react";
// import axios from "axios";

export interface PropsHome {
  something: string;
}

class Home extends React.Component<PropsHome> {
  constructor(props: any) {
    super(props);    
  }

  resolveAfter2Seconds() {
    // return axios.get("/test");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, 2000);
    });
  }
  
  async componentDidMount() {
    try {
      let t = await this.resolveAfter2Seconds();
      console.log(t);
    } catch (error) {
      console.log("error", error);
    }  
  }

  render() {
    return (
      <div>
        {this.props.something}
        <p>Home page</p>
      </div>
    );
  }
}

export default Home;