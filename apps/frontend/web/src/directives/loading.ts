import { h, render, type App, type Directive, type DirectiveBinding } from 'vue';
import { VSpinner } from '@/components/spinner';
const CLASS_NAME_RELATIVE = 'spinner-parent--relative';
const SPINNER_INSTANCE_KEY = Symbol('spinner');
type loadingDirectiveParams = {
  loading?: boolean;
  spinning?: boolean;
};
function getOptions(binding: DirectiveBinding) {
  if (binding.value === undefined) {
    return { spinning: true };
  } else if (typeof binding.value === 'boolean') {
    return { spinning: binding.value };
  } else {
    return { ...binding.value };
  }
}
const loadingDirective: Directive = {
  unmounted(el, binding, vnode) {
    console.log('unmounted-', el, binding, vnode);
  },
};
const spinningDirective: Directive = {
  mounted(el, binding) {
    console.log('-binding-spinningDirective', binding);
    const instance = h(VSpinner, getOptions(binding)); //创建vspinner组件虚拟节点
    console.log('instance--', instance);
    render(instance, el);
    el.classList.add(CLASS_NAME_RELATIVE);
    el[SPINNER_INSTANCE_KEY] = instance;
  },
  unmounted(el) {
    const instance = el[SPINNER_INSTANCE_KEY];
    el.classList.remove(CLASS_NAME_RELATIVE);
    render(null, el);
    instance.el.remove();
    el[SPINNER_INSTANCE_KEY] = null;
  },
  updated(el, binding) {
    console.log('-spinningDirective--updated', el, binding);
    const instance = el[SPINNER_INSTANCE_KEY];
    const options = getOptions(binding);
    console.log('-instance-', instance.component);
    if (options && instance?.component) {
      try {
        Object.keys(options).forEach((key) => {
          instance.component.props[key] = options[key];
        });
        instance.component.update(); //触发spinner组件的生命钩子onUpdated
      } catch (error) {
        console.error('Failed to update spinner component in directive:', error);
      }
    }
  },
};
export const registerLoadingDirective = (app: App, params: loadingDirectiveParams) => {
  const style = document.createElement('style');
  style.id = CLASS_NAME_RELATIVE;
  style.innerHTML = `.${CLASS_NAME_RELATIVE}{
    position:relative !important;
  }`;
  document.head.append(style);
  if (params?.loading) {
    app.directive('loading', loadingDirective);
  }
  if (params?.spinning) {
    app.directive('spinning', spinningDirective);
  }
};
