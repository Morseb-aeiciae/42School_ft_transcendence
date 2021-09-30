// import React, { Component, ComponentClass } from "react";
import React, { Component } from "react";
import { Loading } from "..";

interface IProps {
  dataName: string;
}

const WithLoader = (
  // WrappedComponent: ComponentClass,
  WrappedComponent: any,
  dataName: string
): any => {
  // const WithLoader = <P extends object>(
  //   WrappedComponent: React.ComponentType<P>,
  //   dataName: string //React.ComponentClass<P>{
  //   // )  : React.ComponentClass<P>=> {
  // ): any => {
  return class extends Component<IProps> {
    render() {
      return (
        <>
          {this.props.dataName ? (
            <WrappedComponent {...this.props} />
          ) : (
            <Loading />
          )}
        </>
      );
    }
  };
};

export default WithLoader;
