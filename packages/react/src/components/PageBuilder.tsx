import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import ReactDOM from "react-dom/client";

// Interfaces
interface DynamicComponents {
  Basic: string[];
  Extra: string[];
  Custom?: Record<string, CustomComponentConfig>;
}

interface CustomComponentConfig {
  component: React.ComponentType<any> | string;
  svg?: string;
  title?: string;
}

export interface PageBuilderApi {
  getApi: () => any;
}

interface PageBuilderReactProps {
  config: DynamicComponents;
  customComponents?: Record<string, CustomComponentConfig>;
}

export const PageBuilderReact = forwardRef<PageBuilderApi, PageBuilderReactProps>(
  ({ config, customComponents }, ref) => {
    const builderRef = useRef<HTMLElement>(null);
    const [processedConfig, setProcessedConfig] = useState<DynamicComponents>(config);

    // Load web component
    useEffect(() => {
      import("@mindfiredigital/page-builder-web-component").catch((error) => {
        console.error("Failed to load web component:", error);
      });
    }, []);

    useEffect(() => {
      const modifiedConfig: DynamicComponents | any = JSON.parse(
        JSON.stringify(config)
      );

      if (customComponents) {
        modifiedConfig.Custom = modifiedConfig.Custom || {};

        Object.entries(customComponents).forEach(([key, componentConfig]) => {
          if (!componentConfig.component) {
            console.warn(`Skipping invalid component: ${key}`);
            return;
          }

          const tagName = `react-component-${key.toLowerCase()}`;

          if (!customElements.get(tagName)) {
            class ReactComponentElement extends HTMLElement {
              connectedCallback() {
                const mountPoint = document.createElement("div");
                this.appendChild(mountPoint);

                try {
                  ReactDOM.createRoot(mountPoint).render(
                    React.createElement(componentConfig.component)
                  );
                } catch (error) {
                  console.error(`Error rendering ${key} component:`, error);
                }
              }
            }

            customElements.define(tagName, ReactComponentElement);
          }

          modifiedConfig.Custom[key] = {
            component: tagName,
            svg: componentConfig.svg,
            title: componentConfig.title,
          };
        });
      }

      setProcessedConfig(modifiedConfig);
    }, [config, customComponents]);

    // Set config-data on builder element
    useEffect(() => {
      if (builderRef.current) {
        try {
          const configString = JSON.stringify(processedConfig);
          builderRef.current.setAttribute("config-data", configString);
        } catch (error) {
          console.error("Error setting config-data:", error);
        }
      }
    }, [processedConfig]);

    // Expose API to parent via ref
    useImperativeHandle(ref, () => ({
      getApi: () => {
        const builder = builderRef.current as any;
        if (builder?.getApi) {
          return builder.getApi();
        } else {
          console.warn("PageBuilder API not ready yet");
          return null;
        }
      },
    }));

    return <page-builder ref={builderRef} />;
  }
);
