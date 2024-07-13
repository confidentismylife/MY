import { describe, test, it, expect, vi } from "vitest"; // 导入测试框架vitest中的相关函数和工具
import { mount } from "@vue/test-utils"; // 导入Vue的测试工具库
import type { ButtonType, ButtonSize } from "./types"; // 导入按钮组件的类型定义

import Button from "./Button.vue"; // 导入Button组件
import ButtonGroup from "./ButtonGroup.vue"; // 导入ButtonGroup组件

describe("Button.vue", () => { // 描述Button组件的测试套件
  const onClick = vi.fn(); // 创建一个模拟的点击事件处理函数
  test("basic button", async () => { // 测试基本的按钮功能
    const wrapper = mount(() => ( // 挂载Button组件
      <Button type="primary" {...{ onClick }}>
        button content
      </Button>
    ));

    // class
    expect(wrapper.classes()).toContain("er-button--primary"); // 检查按钮是否包含指定的类名

    // slot
    expect(wrapper.get("button").text()).toBe("button content"); // 检查按钮的文本内容是否正确

    // events
    await wrapper.get("button").trigger("click"); // 触发按钮的点击事件
    expect(onClick).toHaveBeenCalledOnce(); // 检查点击事件处理函数是否被调用一次
  });

  test("disabled button", async () => { // 测试禁用状态的按钮
    const wrapper = mount(() => ( // 挂载Button组件
      <Button disabled {...{ onClick }}>
        disabled button
      </Button>
    ));

    // class
    expect(wrapper.classes()).toContain("is-disabled"); // 检查按钮是否包含禁用的类名

    // attrs
    expect(wrapper.attributes("disabled")).toBeDefined(); // 检查按钮是否包含disabled属性
    expect(wrapper.find("button").element.disabled).toBeTruthy(); // 检查按钮的disabled属性是否为真

    // events
    await wrapper.get("button").trigger("click"); // 触发按钮的点击事件
    expect(onClick).toHaveBeenCalledOnce(); // 检查点击事件处理函数是否被调用一次
    expect(wrapper.emitted("click")).toBeUndefined(); // 检查按钮是否没有触发点击事件
  });

  test("loading button", () => { // 测试加载状态的按钮
    const wrapper = mount(Button, { // 挂载Button组件
      props: {
        loading: true, // 设置按钮为加载状态
      },
      slots: {
        default: "loading button", // 设置按钮的默认插槽内容
      },
      // global: {
      //   stubs: ["ErIcon"], // 使用存根组件替换ErIcon
      // },
    });

    // class
    expect(wrapper.classes()).toContain("is-loading"); // 检查按钮是否包含加载的类名

    // attrs
    expect(wrapper.attributes("disabled")).toBeDefined(); // 检查按钮是否包含disabled属性
    expect(wrapper.find("button").element.disabled).toBeTruthy(); // 检查按钮的disabled属性是否为真

    // events
    wrapper.get("button").trigger("click"); // 触发按钮的点击事件
    expect(wrapper.emitted()).not.toHaveProperty("click"); // 检查按钮是否没有触发点击事件

    // icon
    // const iconElement = wrapper.findComponent(Icon); // 查找按钮中的图标组件
    // expect(iconElement.exists()).toBeTruthy(); // 检查图标组件是否存在
    // expect(iconElement.attributes("icon")).toBe("spinner"); // 检查图标组件的icon属性是否正确
  });

  // test("icon button", () => { // 测试带有图标的按钮
  //   const wrapper = mount(Button, { // 挂载Button组件
  //     props: {
  //       icon: "arrow-up", // 设置按钮的图标
  //     },
  //     slots: {
  //       default: "icon button", // 设置按钮的默认插槽内容
  //     },
  //     global: {
  //       stubs: ["ErIcon"], // 使用存根组件替换ErIcon
  //     },
  //   });

  //   const iconElement = wrapper.findComponent(Icon); // 查找按钮中的图标组件
  //   expect(iconElement.exists()).toBeTruthy(); // 检查图标组件是否存在
  //   expect(iconElement.attributes("icon")).toBe("arrow-up"); // 检查图标组件的icon属性是否正确
  // });

  // Props: type
  it("should has the correct type class when type prop is set", () => { // 测试按钮的type属性
    const types = ["primary", "success", "warning", "danger", "info"]; // 定义按钮的类型
    types.forEach((type) => {
      const wrapper = mount(Button, { // 挂载Button组件
        props: { type: type as ButtonType }, // 设置按钮的type属性
      });
      expect(wrapper.classes()).toContain(`er-button--${type}`); // 检查按钮是否包含指定的类名
    });
  });

  // Props: size
  it("should has the correct size class when size prop is set", () => { // 测试按钮的size属性
    const sizes = ["large", "default", "small"]; // 定义按钮的大小
    sizes.forEach((size) => {
      const wrapper = mount(Button, { // 挂载Button组件
        props: { size: size as ButtonSize }, // 设置按钮的size属性
      });
      expect(wrapper.classes()).toContain(`er-button--${size}`); // 检查按钮是否包含指定的类名
    });
  });

  // // Props: plain, round, circle
  // it.each([
  //   ["plain", "is-plain"],
  //   ["round", "is-round"],
  //   ["circle", "is-circle"],
  //   ["disabled", "is-disabled"],
  //   ["loading", "is-loading"],
  // ])(
  //   "should has the correct class when prop %s is set to true",
  //   (prop, className) => { // 测试按钮的其他属性
  //     const wrapper = mount(Button, { // 挂载Button组件
  //       props: { [prop]: true }, // 设置按钮的属性
  //       global: {
  //         stubs: ["ErIcon"], // 使用存根组件替换ErIcon
  //       },
  //     });
  //     expect(wrapper.classes()).toContain(className); // 检查按钮是否包含指定的类名
  //   }
  // );

  it("should has the correct native type attribute when native-type prop is set", () => { // 测试按钮的原生type属性
    const wrapper = mount(Button, { // 挂载Button组件
      props: { nativeType: "submit" }, // 设置按钮的原生type属性
    });
    expect(wrapper.element.tagName).toBe("BUTTON"); // 检查按钮的标签名是否正确
    expect((wrapper.element as any).type).toBe("submit"); // 检查按钮的原生type属性是否正确
  });

  // Test the click event with and without throttle
  it.each([
    ["withoutThrottle", false],
    ["withThrottle", true],
  ])("emits click event %s", async (_, useThrottle) => { // 测试按钮的点击事件
    const clickSpy = vi.fn(); // 创建一个模拟的点击事件处理函数
    const wrapper = mount(() => ( // 挂载Button组件
      <Button
        onClick={clickSpy}
        {...{
          useThrottle, // 设置是否使用节流
          throttleDuration: 400, // 设置节流的时间间隔
        }}
      />
    ));

    await wrapper.get("button").trigger("click"); // 触发按钮的点击事件
    expect(clickSpy).toHaveBeenCalled(); // 检查点击事件处理函数是否被调用
  });

  // Props: tag
  it("should renders the custom tag when tag prop is set", () => { // 测试按钮的自定义标签
    const wrapper = mount(Button, { // 挂载Button组件
      props: { tag: "a" }, // 设置按钮的自定义标签
    });
    expect(wrapper.element.tagName.toLowerCase()).toBe("a"); // 检查按钮的标签名是否正确
  });

  // Events: click
  it("should emits a click event when the button is clicked", async () => { // 测试按钮的点击事件
    const wrapper = mount(Button, {}); // 挂载Button组件
    await wrapper.trigger("click"); // 触发按钮的点击事件
    expect(wrapper.emitted().click).toHaveLength(1); // 检查按钮是否触发了点击事件
  });

//   // Exception Handling: loading state
//   it("should display loading icon and not emit click event when button is loading", async () => { // 测试按钮的加载状态
//     const wrapper = mount(Button, { // 挂载Button组件
//       props: { loading: true }, // 设置按钮为加载状态
//       global: {
//         stubs: ["ErIcon"], // 使用存根组件替换ErIcon
//       },
//     });
//     const iconElement = wrapper.findComponent(Icon); // 查找按钮中的图标组件

//     expect(wrapper.find(".loading-icon").exists()).toBe(true); // 检查加载图标是否存在
//     expect(iconElement.exists()).toBeTruthy(); // 检查图标组件是否存在
//     expect(iconElement.attributes("icon")).toBe("spinner"); // 检查图标组件的icon属性是否正确
//     await wrapper.trigger("click"); // 触发按钮的点击事件
//     expect(wrapper.emitted("click")).toBeUndefined(); // 检查按钮是否没有触发点击事件
//   });
// });

describe("ButtonGroup.vue", () => { // 描述ButtonGroup组件的测试套件
  test("basic button group", async () => { // 测试基本的按钮组功能
    const wrapper = mount(() => ( // 挂载ButtonGroup组件
      <ButtonGroup>
        <Button>button 1</Button>
        <Button>button 2</Button>
      </ButtonGroup>
    ));

    expect(wrapper.classes()).toContain("er-button-group"); // 检查按钮组是否包含指定的类名
  });

  test("button group size", () => { // 测试按钮组的大小
    const sizes = ["large", "default", "small"]; // 定义按钮组的大小
    sizes.forEach((size) => {
      const wrapper = mount(() => ( // 挂载ButtonGroup组件
        <ButtonGroup size={size as any}>
          <Button>button 1</Button>
          <Button>button 2</Button>
        </ButtonGroup>
      ));

      const buttonWrapper = wrapper.findComponent(Button); // 查找按钮组中的按钮组件
      expect(buttonWrapper.classes()).toContain(`er-button--${size}`); // 检查按钮是否包含指定的类名
    });
  });

  test("button group type", () => { // 测试按钮组的类型
    const types = ["primary", "success", "warning", "danger", "info"]; // 定义按钮组的类型
    types.forEach((type) => {
      const wrapper = mount(() => ( // 挂载ButtonGroup组件
        <ButtonGroup type={type as any}>
          <Button>button 1</Button>
          <Button>button 2</Button>
        </ButtonGroup>
      ));

      const buttonWrapper = wrapper.findComponent(Button); // 查找按钮组中的按钮组件
      expect(buttonWrapper.classes()).toContain(`er-button--${type}`); // 检查按钮是否包含指定的类名
    });
  });

  test("button group disabled", () => { // 测试禁用状态的按钮组
    const wrapper = mount(() => ( // 挂载ButtonGroup组件
      <ButtonGroup disabled>
        <Button>button 1</Button>
        <Button>button 2</Button>
      </ButtonGroup>
    ));

    const buttonWrapper = wrapper.findComponent(Button); // 查找按钮组中的按钮组件
    expect(buttonWrapper.classes()).toContain(`is-disabled`); // 检查按钮是否包含禁用的类名
  });
});