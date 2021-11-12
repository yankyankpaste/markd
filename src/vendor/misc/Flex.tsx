/**
 * @page
 * So essentially this is a copy and tidy from previous work, find this is easier than css when needing speeddddddddddd
 */
import * as React from "react";
import styled from "styled-components";
import Portal from "./Portal";
import classNames from "classnames";
import { createElement } from "react";

const Stack = styled.div.attrs(props => ({
  style: {
    width: props.expand ? "100%" : props.width || "auto",
    height: props.expand ? "100%" : props.height || "auto",
    transform: `scale(${props.scale || 1}) translate(${
      props.position ? `${props.position.x}px, ${props.position.y}px` : `0,0`
    }) `
  }
}))`
  display: flex;

  flex-direction: ${props => (props.column ? "column" : "row")};

  align-items: ${props => {
    if (props.column) {
      if (props.left) return "flex-start";
      if (props.right) return "flex-end";
      if (props.center) return "center";
      if (props.stretchItems) return "stretch";
      return "start";
    } else {
      if (props.top) return "flex-start";
      if (props.middle) return "center";
      if (props.bottom) return "flex-end";
      if (props.stretchItems) return "stretch";
      return "start";
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
      if (props.stretchItems) return "stretch";
      return "stretch";
    } else {
      if (props.left) return "flex-start";
      if (props.right) return "flex-end";
      if (props.center) return "center";
      if (props.stretchItems) return "stretch";
      return "stretch";
    }
  }};

  align-self: ${props => (props.stretch ? "stretch" : props.alignSelf)};

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

  position: ${props => (props.absolute ? "absolute" : "auto")};

  text-align: ${props => (props["text-center"] ? "center" : "inherit")};

  cursor: ${props => (props.onClick ? "pointer" : "default")};

  /* other */
  background: ${props =>
    props.background && props.background.startsWith("--") ? `var(${props.background})` : props.background};

  color: ${props => (props.color && props.color.startsWith("--") ? `var(${props.color})` : props.color)};

  box-sizing: border-box;

  flex-wrap: ${props => (props.wrap === "true" ? "wrap" : "no-wrap")};

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

  ${props => display(props)}

  ${props => flexProps(props)}
`;

const flexProps = props => {
  if ("flex" in props) {
    if (props.flex === 0) return "flex: 0 0 auto";
    return `flex: ${props.flex}`;
  }
};

const display = props => {
  if ("hidden" in props) return props.hidden ? "display: none;" : "display: flex;";
  if ("visible" in props) return props.visible ? "display: flex;" : "display: none;";
};

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

const parseDimension = (val = "auto") => (typeof val !== "string" ? val + "px" : val);

// @ts-ignore
export const Box = React.forwardRef<any, any>((props, ref) => {
  const css = classNames(props.className);
  const rest = { ...props };
  if (props.aria) {
    rest["aria-label"] = props.aria
      .split(" ")
      .join("-")
      .toLowerCase();
    rest.role = "region";
  }
  // @ts-ignore
  return <Stack {...rest} className={css} ref={ref} />;
});

export default Box;

export const Status = props => (!!props.display ? props.children || null : null);

export const Component = props => props.children || null;

// export const mFlex = motion(Flex);
