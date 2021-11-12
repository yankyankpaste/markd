// @ts-nocheck
import * as React from "react";
import styled from "styled-components";
import Portal from "./Portal";
import classNames from "classnames";
import { createElement } from "react";
import { useSpring, animated, interpolate, useTransition, config, useChain } from "react-spring";
// import { motion } from "framer-motion";

const withDynamicTag = Component => {
  const bucket = Object.create(null);

  const DynamicTag = props => {
    const { tag } = props;

    if (typeof tag !== "string" || !styled.hasOwnProperty(tag)) {
      return createElement(Component, props);
    }

    if (bucket[tag] === undefined) {
      bucket[tag] = Component.withComponent(tag);
    }

    return createElement(bucket[tag], props);
  };

  const name = Component.displayName || Component.constructor.name;

  if (name) {
    DynamicTag.displayName = `DynamicTag(${name})`;
  }

  return DynamicTag;
};

const StackContainer = styled.div.attrs(props => ({
  style: {
    width: props.expand ? "100%" : props.width || "auto",
    height: props.expand ? "100%" : props.height || "auto",
    transform: `scale(${props.scale || 1}) translate(${
      props.position ? `${props.position.x}px, ${props.position.y}px` : `0,0`
    }) `
  }
}))`
  // Flex styling
  display: flex;

  flex-direction: ${props => (props.column ? "column" : "row")};

  align-items: ${props => {
    if (props.column) {
      if (props.left) return "flex-start";
      if (props.right) return "flex-end";
      if (props.center) return "center";
      return "stretch";
    } else {
      if (props.top) return "flex-start";
      if (props.middle) return "center";
      if (props.bottom) return "flex-end";
      return "stretch";
    }
  }};

  justify-content: ${props => {
    if (props.spaceAround) return "space-around";
    if (props.spaceEvenly) return "space-evenly";
    if (props.spaceBetween) return "space-between";
    if (props.column) {
      if (props.top) return "flex-start";
      if (props.middle) return "center";
      if (props.bottom) return "flex-end";
      return "stretch";
    } else {
      if (props.left) return "flex-start";
      if (props.right) return "flex-end";
      if (props.center) return "center";
      return "stretch";
    }
  }};

  align-self: ${props => (props.stretchSelf ? "stretch" : props.alignSelf)};

  // Create child flex properties
  ${({ flexItems = [] }) => flexItems.map(flexChild).join("")};

  /* other positional css  */

  top: ${props => (props.top ? parseDimension(props.top) : "auto")};

  left: ${props => (props.left ? parseDimension(props.left) : "auto")};

  right: ${props => (props.right ? parseDimension(props.right) : "auto")};

  bottom: ${props => (props.bottom ? parseDimension(props.bottom) : "auto")};

  border: ${props => (props.border ? props.border : "auto")};

  min-width: ${props => (props.minWidth ? parseDimension(props.minWidth) : "auto")};

  max-width: ${props => (props.maxWidth ? parseDimension(props.maxWidth) : "auto")};

  max-height: ${props => (props.maxHeight ? parseDimension(props.maxHeight) : "auto")};

  min-height: ${props => (props.minHeight ? parseDimension(props.minHeight) : "auto")};

  opacity: ${props => (props.opacity ? props.opacity : 1)};

  display: ${props => (props.hidden ? "none" : "flex")};

  position: ${props => (props.absolute ? "absolute" : "auto")};

  text-align: ${props => (props["text-center"] ? "center" : "inherit")};

  cursor: ${props => (props.onClick ? "pointer" : "default")};

  /* other */
  background: ${props =>
    props.background && props.background.startsWith("--") ? `var(${props.background})` : props.background};

  color: ${props => (props.color && props.color.startsWith("--") ? `var(${props.color})` : props.color)};

  box-sizing: border-box;

  flex-wrap: ${props => (props.wrap === "true" ? "wrap" : "no-wrap")};

  flex: ${props => (props.flex ? props.flex : "initial")};

  margin: ${props => (props.margin ? parseDimension(props.margin) : undefined)};

  > * {
    // padding: 1rem;
    // margin: 0.5rem;
    box-sizing: border-box;
    margin: ${props =>
      props.gap
        ? props.column
          ? `0px 0px ${parseDimension(props.gap)} 0px`
          : `0px ${parseDimension(props.gap)} 0px 0px`
        : "null"};
  }

  border-radius: ${props => (props.rounded ? parseDimension(props.rounded) : 0)};

  padding: ${props => (props.padding ? parseDimension(props.padding) : 0)};

  overflow: ${props => props.overflow || "initial"};

  box-shadow: ${props => (props.shadow ? `0px 4px ${props.shadow}px 1px  rgba(0,0,0,0.1)` : "none")};

  ${props => disabled(props)}

  ${props => gap(props)}
`;

const gap = props => {
  if (props.gap && props.column) {
    return `
    > *:first-child {
      margin-top: 0;
    }
  
    > *:last-child {
      margin-bottom: 0;
    }
    `;
  } else if (props.gap) {
    return `
    > *:first-child {
      margin-left: 0;
    }
  
    > *:last-child {
      margin-right: 0;
    }
    `;
  }
};

const disabled = props => {
  if (props.disabled) {
    return `opacity: 0.5;
      user-select: none;
      pointer-events: none;
      cursor: default;
    `;
  }
};

const flexChild = (value, i) => `> *:nth-child(${i + 1}){
    flex: ${value} 1 auto;
}`;

const axis1 = ({ left, right, center, stretchItems }, isCross?) => {
  if (left) return "flex-start";
  if (right) return "flex-end";
  if (center) return "center";
  if (isCross) return "stretch";
};

const axis2 = ({ middle, top, bottom }, isCross?) => {
  if (top) return "flex-start";
  if (middle) return "center";
  if (bottom) return "flex-end";
  if (isCross) return "stretch";
};

const parseDimension = (val = "auto") => (typeof val !== "string" ? val + "px" : val);

// @ts-ignore
const StackInner = React.forwardRef<any, any>((props, ref) => {
  const css = classNames(props.className);
  if (props.portal) {
    const { onClickPortal, ...rest } = props;
    return (
      <Portal modal={props.modal} background={props.modalBackground}>
        <StackContainer width="100%" height="100%" onClick={onClickPortal ? onClickPortal : () => null}>
          <StackContainer {...rest} className={css} ref={ref} />
        </StackContainer>
      </Portal>
    );
  }
  const rest = { ...props };
  if (props.name)
    rest[
      "data-auto-" +
        props.name
          .split(" ")
          .join("-")
          .toLowerCase()
    ] = "true";
  // @ts-ignore
  return <StackContainer {...rest} wrap={props.wrap ? "true" : "false"} className={css} ref={ref} />;
});

StackContainer.defaultProps = {};
// @ts-ignore
const Flex = StackInner;

export const Div = Flex;

export const Status = props => (!!props.display ? props.children || null : null);

export const Component = props => props.children || null;

// export const mFlex = motion(Flex);

export default Flex;
