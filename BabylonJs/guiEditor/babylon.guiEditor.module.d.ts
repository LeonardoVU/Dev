
declare module "babylonjs-gui-editor/components/commandBarComponent" {
import * as React from "react";
import { GlobalState } from "babylonjs-gui-editor/globalState";
import "babylonjs-gui-editor/scss/commandBar.scss";
interface ICommandBarComponentProps {
    globalState: GlobalState;
}
export class CommandBarComponent extends React.Component<ICommandBarComponentProps> {
    private _sizeOption;
    private _stopUpdating;
    private _lockObject;
    constructor(props: ICommandBarComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/components/commandButtonComponent" {
import * as React from "react";
interface ICommandButtonComponentProps {
    tooltip: string;
    shortcut?: string;
    icon: string;
    iconLabel?: string;
    isActive: boolean;
    copyDeleteDisabled?: boolean;
    pasteDisabled?: boolean;
    onClick: () => void;
    altStyle?: boolean;
    disabled?: boolean;
}
export class CommandButtonComponent extends React.Component<ICommandButtonComponentProps> {
    constructor(props: ICommandButtonComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/components/commandDropdownComponent" {
import * as React from "react";
import { GlobalState } from "babylonjs-gui-editor/globalState";
interface ICommandDropdownComponentProps {
    globalState: GlobalState;
    icon?: string;
    tooltip: string;
    defaultValue?: string;
    items: {
        label: string;
        icon?: string;
        fileButton?: boolean;
        loadControlButton?: boolean;
        onClick?: () => void;
        onCheck?: (value: boolean) => void;
        storeKey?: string;
        isActive?: boolean;
        defaultValue?: boolean | string;
        subItems?: string[];
    }[];
    toRight?: boolean;
}
export class CommandDropdownComponent extends React.Component<ICommandDropdownComponentProps, {
    isExpanded: boolean;
    activeState: string;
}> {
    constructor(props: ICommandDropdownComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/components/guiList/guiListComponent" {
import * as React from "react";
import { GlobalState } from "babylonjs-gui-editor/globalState";
import "babylonjs-gui-editor/components/guiList/guiList.scss";
interface IGuiListComponentProps {
    globalState: GlobalState;
}
export class GuiListComponent extends React.Component<IGuiListComponentProps, {
    filter: string;
}> {
    private _onResetRequiredObserver;
    private static _Tooltips;
    constructor(props: IGuiListComponentProps);
    componentWillUnmount(): void;
    filterContent(filter: string): void;

}
export {};

}
declare module "babylonjs-gui-editor/components/log/logComponent" {
import * as React from "react";
import { GlobalState } from "babylonjs-gui-editor/globalState";
import "babylonjs-gui-editor/components/log/log.scss";
interface ILogComponentProps {
    globalState: GlobalState;
}
export class LogEntry {
    message: string;
    isError: boolean;
    constructor(message: string, isError: boolean);
}
export class LogComponent extends React.Component<ILogComponentProps, {
    logs: LogEntry[];
}> {
    constructor(props: ILogComponentProps);
    componentDidMount(): void;
    componentDidUpdate(): void;

}
export {};

}
declare module "babylonjs-gui-editor/components/parentingPropertyGridComponent" {
import * as React from "react";
import { Control } from "babylonjs-gui/2D/controls/control";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { Observable } from "babylonjs/Misc/observable";
interface IParentingPropertyGridComponentProps {
    control: Control;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class ParentingPropertyGridComponent extends React.Component<IParentingPropertyGridComponentProps> {
    constructor(props: IParentingPropertyGridComponentProps);
    private _columnNumber;
    private _rowNumber;
    updateGridPosition(): void;
    getCellInfo(): void;
    private _changeCell;

}
export {};

}
declare module "babylonjs-gui-editor/components/propertyTab/propertyGrids/gui/buttonPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { Rectangle } from "babylonjs-gui/2D/controls/rectangle";
import { GlobalState } from "babylonjs-gui-editor/globalState";
interface IButtonPropertyGridComponentProps {
    rectangles: Rectangle[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onAddComponent: (newComponent: string) => void;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export class ButtonPropertyGridComponent extends React.Component<IButtonPropertyGridComponentProps> {
    constructor(props: IButtonPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/components/propertyTab/propertyGrids/gui/checkboxPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { Checkbox } from "babylonjs-gui/2D/controls/checkbox";
import { GlobalState } from "babylonjs-gui-editor/globalState";
interface ICheckboxPropertyGridComponentProps {
    checkboxes: Checkbox[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export class CheckboxPropertyGridComponent extends React.Component<ICheckboxPropertyGridComponentProps> {
    constructor(props: ICheckboxPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/components/propertyTab/propertyGrids/gui/colorPickerPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { ColorPicker } from "babylonjs-gui/2D/controls/colorpicker";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { GlobalState } from "babylonjs-gui-editor/globalState";
interface IColorPickerPropertyGridComponentProps {
    colorPickers: ColorPicker[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export class ColorPickerPropertyGridComponent extends React.Component<IColorPickerPropertyGridComponentProps> {
    constructor(props: IColorPickerPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/components/propertyTab/propertyGrids/gui/commonControlPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { Control } from "babylonjs-gui/2D/controls/control";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { IInspectableOptions } from "babylonjs/Misc/iInspectable";
import { GlobalState } from "babylonjs-gui-editor/globalState";
interface ICommonControlPropertyGridComponentProps {
    controls: Control[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    hideDimensions?: boolean;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
interface ICommonControlPropertyGridComponentState {
    fontFamilyOptions: IInspectableOptions[];
}
export class CommonControlPropertyGridComponent extends React.Component<ICommonControlPropertyGridComponentProps, ICommonControlPropertyGridComponentState> {
    private _onPropertyChangedObserver;
    private _onFontsParsedObserver;
    private _onControlVisibilityChangedObservers;
    constructor(props: ICommonControlPropertyGridComponentProps);
    componentWillMount(): void;
    private _checkFontsInLayout;
    private _addFont;
    private _getTransformedReferenceCoordinate;
    private _updateAlignment;
    private _checkAndUpdateValues;
    private _addOrUpdateMetadata;
    private _removeFromMetadata;
    private _getCommonPropertyKeys;
    private _markChildrenAsDirty;
    componentWillUnmount(): void;
    _filterFontDuplicates(array: {
        label: string;
        value: string;
        id: string;
    }[]): {
        label: string;
        value: string;
        id: string;
    }[];

}
export {};

}
declare module "babylonjs-gui-editor/components/propertyTab/propertyGrids/gui/containerPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { Container } from "babylonjs-gui/2D/controls/container";
interface IContainerPropertyGridComponentProps {
    containers: Container[];
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class ContainerPropertyGridComponent extends React.Component<IContainerPropertyGridComponentProps> {

}
export {};

}
declare module "babylonjs-gui-editor/components/propertyTab/propertyGrids/gui/controlPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { Control } from "babylonjs-gui/2D/controls/control";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { GlobalState } from "babylonjs-gui-editor/globalState";
interface IControlPropertyGridComponentProps {
    controls: Control[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export class ControlPropertyGridComponent extends React.Component<IControlPropertyGridComponentProps> {
    constructor(props: IControlPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/components/propertyTab/propertyGrids/gui/displayGridPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { DisplayGrid } from "babylonjs-gui/2D/controls/displayGrid";
import { GlobalState } from "babylonjs-gui-editor/globalState";
interface IDisplayGridPropertyGridComponentProps {
    displayGrids: DisplayGrid[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export class DisplayGridPropertyGridComponent extends React.Component<IDisplayGridPropertyGridComponentProps> {
    constructor(props: IDisplayGridPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/components/propertyTab/propertyGrids/gui/ellipsePropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { Ellipse } from "babylonjs-gui/2D/controls/ellipse";
import { GlobalState } from "babylonjs-gui-editor/globalState";
interface IEllipsePropertyGridComponentProps {
    ellipses: Ellipse[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export class EllipsePropertyGridComponent extends React.Component<IEllipsePropertyGridComponentProps> {
    constructor(props: IEllipsePropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/components/propertyTab/propertyGrids/gui/gridPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { Grid } from "babylonjs-gui/2D/controls/grid";
import { GlobalState } from "babylonjs-gui-editor/globalState";
interface IGridPropertyGridComponentProps {
    grids: Grid[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
    onUpdateRequiredObservable?: Observable<void>;
}
interface IGridPropertyComponentState {
    removingColumn: boolean;
    removingRow: boolean;
}
export class GridPropertyGridComponent extends React.Component<IGridPropertyGridComponentProps, IGridPropertyComponentState> {
    constructor(props: IGridPropertyGridComponentProps);
    private _previousGrid;
    private _rowDefinitions;
    private _rowEditFlags;
    private _columnEditFlags;
    private _columnDefinitions;
    private _editedRow;
    private _editedColumn;
    private _rowChild;
    private _columnChild;

    setRowValues(): void;
    setColumnValues(): void;

    parsePercentage(value: string): number;
    isCloseTo(value: number, expected: number, epsilon?: number): boolean;
    adjustPercentages(definitions: string[], editFlags: boolean[]): string[];
    resizeRow(): void;
    resizeColumn(): void;
    checkValue(value: string, percent: boolean): string;
    checkPercentage(value: string): boolean;
    resetValues(): void;

}
export {};

}
declare module "babylonjs-gui-editor/components/propertyTab/propertyGrids/gui/imageBasedSliderPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { ImageBasedSlider } from "babylonjs-gui/2D/controls/sliders/imageBasedSlider";
import { GlobalState } from "babylonjs-gui-editor/globalState";
interface IImageBasedSliderPropertyGridComponentProps {
    imageBasedSliders: ImageBasedSlider[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export class ImageBasedSliderPropertyGridComponent extends React.Component<IImageBasedSliderPropertyGridComponentProps> {
    constructor(props: IImageBasedSliderPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/components/propertyTab/propertyGrids/gui/imagePropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { Image } from "babylonjs-gui/2D/controls/image";
import { GlobalState } from "babylonjs-gui-editor/globalState";
interface IImagePropertyGridComponentProps {
    images: Image[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export class ImagePropertyGridComponent extends React.Component<IImagePropertyGridComponentProps> {
    private _observers;
    constructor(props: IImagePropertyGridComponentProps);
    shouldComponentUpdate(nextProps: IImagePropertyGridComponentProps): boolean;
    updateObservers(oldImages: Image[], newImages: Image[]): void;
    componentWillUnmount(): void;
    toggleAnimations(on: boolean): void;
    getMaxCells(): number;
    updateCellSize(): void;

}
export {};

}
declare module "babylonjs-gui-editor/components/propertyTab/propertyGrids/gui/inputTextPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { InputText } from "babylonjs-gui/2D/controls/inputText";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { GlobalState } from "babylonjs-gui-editor/globalState";
interface IInputTextPropertyGridComponentProps {
    inputTexts: InputText[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export class InputTextPropertyGridComponent extends React.Component<IInputTextPropertyGridComponentProps> {
    constructor(props: IInputTextPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/components/propertyTab/propertyGrids/gui/linePropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { Line } from "babylonjs-gui/2D/controls/line";
import { GlobalState } from "babylonjs-gui-editor/globalState";
interface ILinePropertyGridComponentProps {
    lines: Line[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export class LinePropertyGridComponent extends React.Component<ILinePropertyGridComponentProps> {
    constructor(props: ILinePropertyGridComponentProps);
    onDashChange(value: string): void;

}
export {};

}
declare module "babylonjs-gui-editor/components/propertyTab/propertyGrids/gui/radioButtonPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { RadioButton } from "babylonjs-gui/2D/controls/radioButton";
import { GlobalState } from "babylonjs-gui-editor/globalState";
interface IRadioButtonPropertyGridComponentProps {
    radioButtons: RadioButton[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export class RadioButtonPropertyGridComponent extends React.Component<IRadioButtonPropertyGridComponentProps> {
    constructor(props: IRadioButtonPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/components/propertyTab/propertyGrids/gui/rectanglePropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { Rectangle } from "babylonjs-gui/2D/controls/rectangle";
import { GlobalState } from "babylonjs-gui-editor/globalState";
interface IRectanglePropertyGridComponentProps {
    rectangles: Rectangle[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export class RectanglePropertyGridComponent extends React.Component<IRectanglePropertyGridComponentProps> {
    constructor(props: IRectanglePropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/components/propertyTab/propertyGrids/gui/scrollViewerPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { ScrollViewer } from "babylonjs-gui/2D/controls/scrollViewers/scrollViewer";
import { GlobalState } from "babylonjs-gui-editor/globalState";
interface IScrollViewerPropertyGridComponentProps {
    scrollViewers: ScrollViewer[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export class ScrollViewerPropertyGridComponent extends React.Component<IScrollViewerPropertyGridComponentProps> {
    constructor(props: IScrollViewerPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/components/propertyTab/propertyGrids/gui/sliderGenericPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { Slider } from "babylonjs-gui/2D/controls/sliders/slider";
import { GlobalState } from "babylonjs-gui-editor/globalState";
interface ISliderGenericPropertyGridComponentProps {
    sliders: Slider[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export class SliderGenericPropertyGridComponent extends React.Component<ISliderGenericPropertyGridComponentProps> {
    constructor(props: ISliderGenericPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/components/propertyTab/propertyGrids/gui/sliderPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { Slider } from "babylonjs-gui/2D/controls/sliders/slider";
import { ImageBasedSlider } from "babylonjs-gui/2D/controls/sliders/imageBasedSlider";
interface ISliderPropertyGridComponentProps {
    sliders: (Slider | ImageBasedSlider)[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class SliderPropertyGridComponent extends React.Component<ISliderPropertyGridComponentProps> {
    constructor(props: ISliderPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/components/propertyTab/propertyGrids/gui/stackPanelPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { StackPanel } from "babylonjs-gui/2D/controls/stackPanel";
import { GlobalState } from "babylonjs-gui-editor/globalState";
interface IStackPanelPropertyGridComponentProps {
    stackPanels: StackPanel[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export class StackPanelPropertyGridComponent extends React.Component<IStackPanelPropertyGridComponentProps> {
    constructor(props: IStackPanelPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/components/propertyTab/propertyGrids/gui/textBlockPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { TextBlock } from "babylonjs-gui/2D/controls/textBlock";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { GlobalState } from "babylonjs-gui-editor/globalState";
interface ITextBlockPropertyGridComponentProps {
    textBlocks: TextBlock[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onFontsParsedObservable?: Observable<void>;
    globalState?: GlobalState;
}
export class TextBlockPropertyGridComponent extends React.Component<ITextBlockPropertyGridComponentProps> {
    constructor(props: ITextBlockPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/components/propertyTab/propertyTabComponent" {
import * as React from "react";
import { GlobalState } from "babylonjs-gui-editor/globalState";
import { Control } from "babylonjs-gui/2D/controls/control";
import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
import "babylonjs-gui-editor/components/propertyTab/propertyTab.scss";
interface IPropertyTabComponentProps {
    globalState: GlobalState;
}
export class PropertyTabComponent extends React.Component<IPropertyTabComponentProps> {
    private _onBuiltObserver;
    private _timerIntervalId;
    private _lockObject;
    constructor(props: IPropertyTabComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    load(file: File): void;
    /**
     * Read loaded file
     * @param file
     */
    loadControl(file: File): void;
    save(saveCallback: () => void): void;
    saveLocally: () => void;
    /**
     * Save the selected control as Json with file name of guiControl
     */
    saveSelectedControlLocally: () => void;
    saveToSnippetServerHelper: (content: string, adt: AdvancedDynamicTexture) => Promise<string>;
    saveToSnippetServer: () => Promise<void>;
    loadFromSnippet(): void;

    /**
     * returns the class name of a list of controls if they share a class, or an empty string if not
     * @param nodes the list of controls to check
     * @returns the class name of a list of controls if they share a class, or an empty string if not
     */
    getControlsCommonClassName(nodes: Control[]): string;

    renderControlIcon(nodes: Control[]): string;

}
export {};

}
declare module "babylonjs-gui-editor/components/sceneExplorer/entities/gui/controlTreeItemComponent" {
import { IExplorerExtensibilityGroup } from "babylonjs/Debug/debugLayer";
import { Control } from "babylonjs-gui/2D/controls/control";
import * as React from "react";
import { GlobalState } from "babylonjs-gui-editor/globalState";
import { DragOverLocation } from "babylonjs-gui-editor/globalState";
interface IControlTreeItemComponentProps {
    control: Control;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    onClick: () => void;
    globalState: GlobalState;
    isHovered: boolean;
    isDragOver: boolean;
    dragOverLocation: DragOverLocation;
    onRenamingStateChanged: (renaming: boolean) => void;
}
export class ControlTreeItemComponent extends React.Component<IControlTreeItemComponentProps, {
    isActive: boolean;
    isVisible: boolean;
    isRenaming: boolean;
}> {
    private _onIsVisibleChangedObserver;
    constructor(props: IControlTreeItemComponentProps);
    componentWillUnmount(): void;
    highlight(): void;
    switchVisibility(): void;
    onRename(name: string): void;

}
export {};

}
declare module "babylonjs-gui-editor/components/sceneExplorer/extensionsComponent" {
import * as React from "react";
import { IExplorerExtensibilityGroup } from "babylonjs/Debug/debugLayer";
interface IExtensionsComponentProps {
    target: any;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
}
export class ExtensionsComponent extends React.Component<IExtensionsComponentProps, {
    popupVisible: boolean;
}> {
    private _popup;
    private _extensionRef;
    constructor(props: IExtensionsComponentProps);
    showPopup(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;

}
export {};

}
declare module "babylonjs-gui-editor/components/sceneExplorer/sceneExplorerComponent" {
import * as React from "react";
import { Nullable } from "babylonjs/types";
import { IExplorerExtensibilityGroup } from "babylonjs/Debug/debugLayer";
import { Scene } from "babylonjs/scene";
import { GlobalState } from "babylonjs-gui-editor/globalState";
import "babylonjs-gui-editor/components/sceneExplorer/sceneExplorer.scss";
interface ISceneExplorerFilterComponentProps {
    onFilter: (filter: string) => void;
}
export class SceneExplorerFilterComponent extends React.Component<ISceneExplorerFilterComponentProps> {
    constructor(props: ISceneExplorerFilterComponentProps);

}
interface ISceneExplorerComponentProps {
    scene?: Scene;
    noCommands?: boolean;
    noHeader?: boolean;
    noExpand?: boolean;
    noClose?: boolean;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    globalState: GlobalState;
    popupMode?: boolean;
    onPopup?: () => void;
    onClose?: () => void;
}
export class SceneExplorerComponent extends React.Component<ISceneExplorerComponentProps, {
    filter: Nullable<string>;
    selectedEntity: any;
    scene: Nullable<Scene>;
}> {
    private _onSelectionChangeObserver;
    private _onParrentingChangeObserver;
    private _onNewSceneObserver;
    private _onPropertyChangedObservable;
    private _onUpdateRequiredObserver;
    constructor(props: ISceneExplorerComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    filterContent(filter: string): void;
    findSiblings(parent: any, items: any[], target: any, goNext: boolean, data: {
        previousOne?: any;
        found?: boolean;
    }): boolean;
    processKeys(keyEvent: React.KeyboardEvent<HTMLDivElement>): void;

    onClose(): void;
    onPopup(): void;

}
export {};

}
declare module "babylonjs-gui-editor/components/sceneExplorer/treeItemComponent" {
import * as React from "react";
import { Nullable } from "babylonjs/types";
import { IExplorerExtensibilityGroup } from "babylonjs/Debug/debugLayer";
import { GlobalState } from "babylonjs-gui-editor/globalState";
export interface ITreeItemComponentProps {
    items?: Nullable<any[]>;
    label: string;
    offset: number;
    filter: Nullable<string>;
    forceSubitems?: boolean;
    globalState: GlobalState;
    entity?: any;
    selectedEntities: any[];
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    contextMenuItems?: {
        label: string;
        action: () => void;
    }[];
}
export class TreeItemComponent extends React.Component<ITreeItemComponentProps, {
    isExpanded: boolean;
    mustExpand: boolean;
}> {
    static _ContextMenuUniqueIdGenerator: number;
    constructor(props: ITreeItemComponentProps);
    switchExpandedState(): void;
    shouldComponentUpdate(nextProps: ITreeItemComponentProps, nextState: {
        isExpanded: boolean;
    }): boolean;
    expandAll(expand: boolean): void;


}

}
declare module "babylonjs-gui-editor/components/sceneExplorer/treeItemLabelComponent" {
import * as React from "react";
interface ITreeItemLabelComponentProps {
    label?: string;
    onClick?: () => void;
    onChange: (newValue: string) => void;
    bracket: string;
    renaming: boolean;
    setRenaming: (renaming: boolean) => void;
}
interface ITreeItemLabelState {
    value: string;
}
export class TreeItemLabelComponent extends React.Component<ITreeItemLabelComponentProps, ITreeItemLabelState> {
    constructor(props: ITreeItemLabelComponentProps);
    onClick(): void;
    onBlur(): void;

}
export {};

}
declare module "babylonjs-gui-editor/components/sceneExplorer/treeItemSelectableComponent" {
import { Nullable } from "babylonjs/types";
import { IExplorerExtensibilityGroup } from "babylonjs/Debug/debugLayer";
import * as React from "react";
import { GlobalState } from "babylonjs-gui-editor/globalState";
import { DragOverLocation } from "babylonjs-gui-editor/globalState";
export interface ITreeItemSelectableComponentProps {
    entity: any;
    selectedEntities: any[];
    mustExpand?: boolean;
    offset: number;
    globalState: GlobalState;
    extensibilityGroups?: IExplorerExtensibilityGroup[];
    filter: Nullable<string>;
}
export interface ITreeItemSelectableComponentState {
    expand: boolean;
    dragOver: boolean;
    isSelected: boolean;
    isHovered: boolean;
    dragOverLocation: DragOverLocation;
    blockDrag: boolean;
}
export class TreeItemSelectableComponent extends React.Component<ITreeItemSelectableComponentProps, ITreeItemSelectableComponentState> {
    private _onSelectionChangedObservable;
    private _onDraggingEndObservable;
    private _onDraggingStartObservable;
    /** flag flipped onDragEnter if dragOver is already true
     * prevents dragLeave from immediately setting dragOver to false
     * required to make dragging work as expected
     * see: see: https://github.com/transformation-dev/matrx/tree/master/packages/dragster
     */
    private _secondDragEnter;
    constructor(props: ITreeItemSelectableComponentProps);
    switchExpandedState(): void;
    shouldComponentUpdate(nextProps: ITreeItemSelectableComponentProps, nextState: {
        isSelected: boolean;
    }): boolean;
    scrollIntoView(): void;
    componentWillUnmount(): void;
    onSelect(): void;


    dragOver(event: React.DragEvent<HTMLDivElement>): void;
    updateDragOverLocation(event: React.DragEvent<HTMLDivElement>): void;
    drop(): void;
}

}
declare module "babylonjs-gui-editor/controlTypes" {
export const ControlTypes: {
    className: string;
    icon: string;
}[];

}
declare module "babylonjs-gui-editor/diagram/artBoard" {
import * as React from "react";
import { GlobalState } from "babylonjs-gui-editor/globalState";
import { Rect } from "babylonjs-gui-editor/diagram/coordinateHelper";
interface IArtBoardProps {
    globalState: GlobalState;
}
interface IArtBoardState {
    bounds: Rect;
}
export class ArtBoardComponent extends React.Component<IArtBoardProps, IArtBoardState> {
    constructor(props: IArtBoardProps);
    update(): void;

}
export {};

}
declare module "babylonjs-gui-editor/diagram/coordinateHelper" {
import { Control } from "babylonjs-gui/2D/controls/control";
import { Matrix2D } from "babylonjs-gui/2D/math2D";
import { Vector2 } from "babylonjs/Maths/math.vector";
import { Observable } from "babylonjs/Misc/observable";
import { GlobalState } from "babylonjs-gui-editor/globalState";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { Measure } from "babylonjs-gui/2D/measure";
export type DimensionProperties = "width" | "left" | "height" | "top" | "paddingLeft" | "paddingRight" | "paddingTop" | "paddingBottom" | "fontSize" | "linkOffsetX" | "linkOffsetY";
export class Rect {
    top: number;
    left: number;
    right: number;
    bottom: number;
    constructor(left: number, top: number, right: number, bottom: number);
    clone(): Rect;
    get center(): Vector2;
    get width(): number;
    get height(): number;
}
export class CoordinateHelper {
    private static _MatrixCache;
    static GlobalState: GlobalState;
    /**
     * Get the scaling of a specific GUI control
     * @param node the node for which we are getting the scaling
     * @param relative should we return only the relative scaling (relative to the parent)
     * @returns an X,Y vector of the scaling
     */
    static GetScale(node: Control, relative?: boolean): Vector2;
    static GetRotation(node: Control, relative?: boolean): number;
    static GetParentSizes(guiControl: Control): Measure;
    /**
     * This function calculates a local matrix for a node, including it's full transformation and pivot point
     *
     * @param node the node to calculate the matrix for
     * @param storedValues should the stored (cached) values be used to calculate the matrix
     * @returns a new matrix for the control
     */
    static GetNodeMatrix(node: Control, storedValues?: Rect): Matrix2D;
    /**
     * Using the node's tree, calculate its world matrix and return it
     * @param node the node to calculate the matrix for
     * @param storedValues used stored valued (cached when pointer down is clicked)
     * @param stopAt stop looking when this node is found
     * @returns the world matrix for this node
     */
    static NodeToRTTWorldMatrix(node: Control, storedValues?: Rect, stopAt?: Control): Matrix2D;
    static NodeToRTTSpace(node: Control, x: number, y: number, reference?: Vector2, storedValues?: Rect, stopAt?: Control): Vector2;
    static RttToLocalNodeSpace(node: Control, x: number, y: number, reference?: Vector2, storedValues?: Rect): Vector2;
    static RttToCanvasSpace(x: number, y: number): Vector2;
    static MousePointerToRTTSpace(_node?: Control, x?: number, y?: number): Vector2;
    private static _ResetMatrixArray;
    static ComputeLocalBounds(node: Control): Rect;
    /**
     * converts a node's dimensions to percentage, properties can be specified as a list, or can convert all
     * @param guiControl
     * @param properties
     * @param onPropertyChangedObservable
     */
    static ConvertToPercentage(guiControl: Control, properties?: DimensionProperties[], onPropertyChangedObservable?: Observable<PropertyChangedEvent>): void;
    static Round(value: number): number;
    static ConvertToPixels(guiControl: Control, properties?: DimensionProperties[], onPropertyChangedObservable?: Observable<PropertyChangedEvent>): void;
}

}
declare module "babylonjs-gui-editor/diagram/gizmoGeneric" {
import { Control } from "babylonjs-gui/2D/controls/control";
import * as React from "react";
import { GlobalState } from "babylonjs-gui-editor/globalState";
import { Rect } from "babylonjs-gui-editor/diagram/coordinateHelper";
import { IScalePoint } from "babylonjs-gui-editor/diagram/gizmoScalePoint";
export interface IGuiGizmoProps {
    globalState: GlobalState;
    control: Control;
}
interface IGuiGizmoState {
    canvasBounds: Rect;
    scalePoints: IScalePoint[];
    scalePointDragging: number;
    isRotating: boolean;
}
export class GizmoGeneric extends React.Component<IGuiGizmoProps, IGuiGizmoState> {
    private _storedValues;
    private _localBounds;
    private _rotation;
    private _gizmoUpdateObserver;
    private _pointerUpObserver;
    private _pointerMoveObserver;
    constructor(props: IGuiGizmoProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    /**
     * Update the gizmo's positions
     */
    updateGizmo(): void;
    private _onUp;
    private _onMove;
    private _rotate;
    private _dragLocalBounds;
    private _updateNodeFromLocalBounds;
    private _beginDraggingScalePoint;
    private _beginRotate;

}
export {};

}
declare module "babylonjs-gui-editor/diagram/gizmoLine" {
import { GlobalState } from "babylonjs-gui-editor/globalState";
import { Line } from "babylonjs-gui/2D/controls/line";
interface IGizmoLineProps {
    globalState: GlobalState;
    control: Line;
}
/**
 * This class represents the gizmo drawn on a line Control.
 * It is used to scale and rotate the control around a pivot point
 * @param props the properties of the gizmo
 * @returns a gizmo line
 */

export {};

}
declare module "babylonjs-gui-editor/diagram/gizmoScalePoint" {
import { Vector2 } from "babylonjs/Maths/math";
import * as React from "react";
export enum ScalePointPosition {
    Top = -1,
    Left = -1,
    Center = 0,
    Right = 1,
    Bottom = 1
}
export interface IScalePoint {
    position: Vector2;
    horizontalPosition: ScalePointPosition;
    verticalPosition: ScalePointPosition;
    rotation: number;
    isPivot: boolean;
    defaultRotation: number;
    id?: number;
}
interface IGizmoScalePointProps {
    scalePoint: IScalePoint;
    clickable: boolean;
    key: number;
    onDrag: (event?: React.PointerEvent<HTMLDivElement>, scalePoint?: IScalePoint) => void;
    onRotate: (event?: React.PointerEvent<HTMLDivElement>, scalePoint?: IScalePoint) => void;
    onUp: () => void;
    overrideCursor?: string;
    canRotate: boolean;
    allowClickOnPivot?: boolean;
}

export {};

}
declare module "babylonjs-gui-editor/diagram/gizmoWrapper" {
import { Nullable } from "babylonjs/types";
import { Observer } from "babylonjs/Misc/observable";
import * as React from "react";
import { GlobalState } from "babylonjs-gui-editor/globalState";
export interface IGizmoWrapperProps {
    globalState: GlobalState;
}
export class GizmoWrapper extends React.Component<IGizmoWrapperProps> {
    observer: Nullable<Observer<void>>;
    componentWillMount(): void;
    componentWillUnmount(): void;

}

}
declare module "babylonjs-gui-editor/diagram/workbench" {
import * as React from "react";
import { GlobalState } from "babylonjs-gui-editor/globalState";
import { Control } from "babylonjs-gui/2D/controls/control";
import { Vector2, Vector3 } from "babylonjs/Maths/math.vector";
import { Scene } from "babylonjs/scene";
import { Container } from "babylonjs-gui/2D/controls/container";
import { ISize } from "babylonjs/Maths/math";
import "babylonjs-gui-editor/diagram/workbenchCanvas.scss";
export interface IWorkbenchComponentProps {
    globalState: GlobalState;
}
export enum ConstraintDirection {
    NONE = 0,
    X = 2,
    Y = 3
}
export class WorkbenchComponent extends React.Component<IWorkbenchComponentProps> {
    private _mouseDown;
    private _rootContainer;
    private _setConstraintDirection;
    private _mouseStartPoint;
    _scene: Scene;
    private _constraintDirection;
    private _panning;
    private _isOverGUINode;
    private _engine;
    private _guiRenderObserver;
    private _doubleClick;
    private _currLeft;
    private _currTop;
    private _controlsHit;
    private _pointerTravelDistance;
    private _processSelectionOnUp;
    private _visibleRegionContainer;
    private _centerZoomMousePosition;
    private _hasPerformedDragZoom;
    private static _addedFonts;
    static get addedFonts(): string[];
    get visibleRegionContainer(): Container;
    private _panAndZoomContainer;
    get panAndZoomContainer(): Container;
    private _trueRootContainer;
    set trueRootContainer(value: Container);
    get trueRootContainer(): Container;
    private _defaultGUISize;
    private _initialPanningOffset;
    private _panningOffset;
    private _zoomFactor;
    private _zoomModeIncrement;
    private _guiSize;
    private _pasteDisabled;
    get guiSize(): ISize;
    get pasteDisabled(): boolean;
    set guiSize(value: ISize);
    applyEditorTransformation(): void;
    removeEditorTransformation(): void;
    private _reframeWindow;
    constructor(props: IWorkbenchComponentProps);
    keyEvent: (evt: KeyboardEvent) => void;
    copyToClipboard(copyFn: (content: string) => void): void;
    cutToClipboard(copyFn: (content: string) => void): void;
    pasteFromClipboard(clipboardContents: string): boolean;
    CopyGUIControl(original: Control): void;
    blurEvent: () => void;
    /**
     * Adds editor observers to control and stores old data in metadata
     * @param guiControl
     */
    addEditorBehavior(guiControl: Control): void;
    /**
     * Removes editor behavior (observables, metadata) from control
     * @param control
     */
    removeEditorBehavior(control: Control): void;
    dispose(): void;
    loadFromJson(serializationObject: any): void;
    /**
     * Load Control from Json then select loaded Control
     * @param serializationObject
     */
    loadControlFromJson(serializationObject: any): void;
    loadFromSnippet(snippetId: string): Promise<void>;
    loadToEditor(): void;
    updateNodeOutlines(): void;
    appendBlock(guiElement: Control): Control;
    private parent;
    private _canClone;
    private _controlToLinkedMeshMap;
    private _observersMap;
    private _saveObservables;
    private _restoreObservables;
    private _copyEditorGUIToLiveGUI;
    private _reorderGrid;
    private _isNotChildInsert;
    private _adjustParentingIndex;
    isSelected(value: boolean, guiNode: Control): void;
    clicked: boolean;
    _onMove(guiControl: Control, evt: Vector2, startPos: Vector2): void;
    onMove(evt: React.PointerEvent): void;
    private _screenToTexturePosition;
    private getScaledPointerPosition;
    startPanning(): void;
    endPanning(): void;
    processSelection(): void;
    onDown(evt: React.PointerEvent<HTMLElement>): void;
    onUp(evt: React.PointerEvent): void;
    private _syncConnectedLines;
    private _copyLiveGUIToEditorGUI;
    createGUICanvas(embed?: boolean): void;
    synchronizeLiveGUI(): void;
    addControls(scene: Scene): void;
    panning(): void;
    moveControls(moveHorizontal: boolean, amount: number): void;
    zoomWheel(event: React.WheelEvent): void;
    private _panZoomToCenter;
    zoomDrag(event: React.MouseEvent): void;
    zooming(delta: number): void;
    zeroIfClose(vec: Vector3): void;

}

}
declare module "babylonjs-gui-editor/globalState" {
/// <reference types="react" />
import { Nullable } from "babylonjs/types";
import { Observable } from "babylonjs/Misc/observable";
import { LogEntry } from "babylonjs-gui-editor/components/log/logComponent";
import { Color3 } from "babylonjs/Maths/math.color";
import { WorkbenchComponent } from "babylonjs-gui-editor/diagram/workbench";
import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { Scene } from "babylonjs/scene";
import { Control } from "babylonjs-gui/2D/controls/control";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { ISize } from "babylonjs/Maths/math";
import { KeyboardManager } from "babylonjs-gui-editor/keyboardManager";
export enum DragOverLocation {
    ABOVE = 0,
    BELOW = 1,
    CENTER = 2,
    NONE = 3
}
export enum GUIEditorTool {
    SELECT = 0,
    PAN = 1,
    ZOOM = 2
}
export class GlobalState {
    liveGuiTexture: Nullable<AdvancedDynamicTexture>;
    guiTexture: AdvancedDynamicTexture;
    hostElement: HTMLElement;
    hostDocument: HTMLDocument;
    hostWindow: Window;
    selectedControls: Control[];
    onSelectionChangedObservable: Observable<void>;
    onResizeObservable: Observable<ISize>;
    onBuiltObservable: Observable<void>;
    onResetRequiredObservable: Observable<void>;
    onUpdateRequiredObservable: Observable<void>;
    onLogRequiredObservable: Observable<LogEntry>;
    onErrorMessageDialogRequiredObservable: Observable<string>;
    onIsLoadingChanged: Observable<boolean>;
    onSelectionBoxMoved: Observable<ClientRect | DOMRect>;
    onNewSceneObservable: Observable<Nullable<Scene>>;
    onGuiNodeRemovalObservable: Observable<Control>;
    onPopupClosedObservable: Observable<void>;
    private _backgroundColor;
    private _outlines;
    keys: KeyboardManager;
    private _fromPG;
    /** DO NOT USE: in the process of removing */
    blockKeyboardEvents: boolean;
    onOutlineChangedObservable: Observable<void>;
    controlCamera: boolean;
    selectionLock: boolean;
    workbench: WorkbenchComponent;
    onPropertyChangedObservable: Observable<PropertyChangedEvent>;
    private _tool;
    private _usePrevSelected;
    private _prevTool;
    onToolChangeObservable: Observable<void>;
    get tool(): GUIEditorTool;
    set tool(newTool: GUIEditorTool);
    get usePrevSelected(): boolean;
    set usePrevSelected(val: boolean);
    restorePreviousTool(): void;
    onFitControlsToWindowObservable: Observable<void>;
    onReframeWindowObservable: Observable<void>;
    onLoadObservable: Observable<File>;
    onSaveObservable: Observable<void>;
    onSaveSelectedControl: Observable<void>;
    onSnippetLoadObservable: Observable<void>;
    onSnippetSaveObservable: Observable<void>;
    onControlLoadObservable: Observable<File>;
    onResponsiveChangeObservable: Observable<boolean>;
    onParentingChangeObservable: Observable<Nullable<Control>>;
    onDropObservable: Observable<void>;
    onPropertyGridUpdateRequiredObservable: Observable<void>;
    onDraggingEndObservable: Observable<void>;
    onDraggingStartObservable: Observable<void>;
    onWindowResizeObservable: Observable<void>;
    onGizmoUpdateRequireObservable: Observable<void>;
    onArtBoardUpdateRequiredObservable: Observable<void>;
    onBackgroundColorChangeObservable: Observable<void>;
    onFontsParsedObservable: Observable<void>;
    onPointerMoveObservable: Observable<import("react").PointerEvent<HTMLCanvasElement>>;
    onPointerUpObservable: Observable<Nullable<PointerEvent | import("react").PointerEvent<HTMLCanvasElement>>>;
    draggedControl: Nullable<Control>;
    draggedControlDirection: DragOverLocation;
    onCopyObservable: Observable<(content: string) => void>;
    onCutObservable: Observable<(content: string) => void>;
    onPasteObservable: Observable<string>;
    isSaving: boolean;
    lockObject: LockObject;
    storeEditorData: (serializationObject: any) => void;
    shiftKeyPressed: boolean;
    customSave?: {
        label: string;
        action: (data: string) => Promise<string>;
    };
    customLoad?: {
        label: string;
        action: (data: string) => Promise<string>;
    };
    constructor();
    /** adds copy, cut and paste listeners to the host window */
    registerEventListeners(): void;
    get backgroundColor(): Color3;
    get fromPG(): boolean;
    set fromPG(value: boolean);
    set backgroundColor(value: Color3);
    get outlines(): boolean;
    set outlines(value: boolean);
    select(control: Control): void;
    setSelection(controls: Control[]): void;
    private _findParentControlInTexture;
    deleteSelectedNodes(): void;
    isMultiSelectable(control: Control): boolean;
    dispose(): void;
}

}
declare module "babylonjs-gui-editor/guiEditor" {
import { Observable } from "babylonjs/Misc/observable";
import { AdvancedDynamicTexture } from "babylonjs-gui/2D/advancedDynamicTexture";
/**
 * Interface used to specify creation options for the gui editor
 */
export interface IGUIEditorOptions {
    liveGuiTexture?: AdvancedDynamicTexture;
    customLoad?: {
        label: string;
        action: (data: string) => Promise<string>;
    } | undefined;
    hostElement?: HTMLElement;
    customSave?: {
        label: string;
        action: (data: string) => Promise<string>;
    };
    currentSnippetToken?: string;
    customLoadObservable?: Observable<any>;
}
/**
 * Class used to create a gui editor
 */
export class GUIEditor {
    private static _CurrentState;
    /**
     * Show the gui editor
     * @param options defines the options to use to configure the gui editor
     * @param embed defines whether editor is being opened from the Playground
     */
    static Show(options: IGUIEditorOptions, embed?: boolean): Promise<void>;
}

}
declare module "babylonjs-gui-editor/guiNodeTools" {
import { Checkbox } from "babylonjs-gui/2D/controls/checkbox";
import { ColorPicker } from "babylonjs-gui/2D/controls/colorpicker";
import { Ellipse } from "babylonjs-gui/2D/controls/ellipse";
import { Line } from "babylonjs-gui/2D/controls/line";
import { Rectangle } from "babylonjs-gui/2D/controls/rectangle";
import { Slider } from "babylonjs-gui/2D/controls/sliders/slider";
import { TextBlock } from "babylonjs-gui/2D/controls/textBlock";
import { Image } from "babylonjs-gui/2D/controls/image";
import { InputText } from "babylonjs-gui/2D/controls/inputText";
import { Grid } from "babylonjs-gui/2D/controls/grid";
import { DisplayGrid } from "babylonjs-gui/2D/controls/displayGrid";
import { StackPanel } from "babylonjs-gui/2D/controls/stackPanel";
import { RadioButton } from "babylonjs-gui/2D/controls/radioButton";
import { ImageBasedSlider } from "babylonjs-gui/2D/controls/sliders/imageBasedSlider";
export class GUINodeTools {
    static ImageControlDefaultUrl: string;
    static CreateControlFromString(data: string): Grid | Rectangle | StackPanel | Line | TextBlock | Image | Slider | ImageBasedSlider | RadioButton | InputText | ColorPicker | Ellipse | Checkbox | DisplayGrid;
}

}
declare module "babylonjs-gui-editor/index" {
export * from "babylonjs-gui-editor/guiEditor";

}
declare module "babylonjs-gui-editor/keyboardManager" {
import { Observable } from "babylonjs/Misc/observable";
type Key = "control" | "shift" | "alt" | "space" | "meta";
export class KeyboardManager {
    private _hostElement;
    private _kdListener;
    private _kuListener;
    private _moveListener;
    private _focusOutListener;
    private _keys;
    onKeyPressedObservable: Observable<Key>;
    constructor(hostElement: HTMLElement | HTMLDocument);
    private _keyEvent;
    private _updateModifierKeys;
    private _setKeyDown;
    private _clearKeys;
    isKeyDown(key: Key): boolean;
    dispose(): void;
}
export {};

}
declare module "babylonjs-gui-editor/legacy/legacy" {
export * from "babylonjs-gui-editor/index";

}
declare module "babylonjs-gui-editor/nodeLocationInfo" {
export interface INodeLocationInfo {
    blockId: number;
    x: number;
    y: number;
}
export interface IFrameData {
    x: number;
    y: number;
    width: number;
    height: number;
    color: number[];
    name: string;
    isCollapsed: boolean;
    blocks: number[];
    comments: string;
}
export interface IEditorData {
    locations: INodeLocationInfo[];
    x: number;
    y: number;
    zoom: number;
    frames?: IFrameData[];
    map?: {
        [key: number]: number;
    };
}

}
declare module "babylonjs-gui-editor/portal" {
import * as React from "react";
import { GlobalState } from "babylonjs-gui-editor/globalState";
interface IPortalProps {
    globalState: GlobalState;
}
export class Portal extends React.Component<IPortalProps> {
    render(): React.ReactPortal;
}
export {};

}
declare module "babylonjs-gui-editor/tools" {
import { Control } from "babylonjs-gui/2D/controls/control";
import { Grid } from "babylonjs-gui/2D/controls/grid";
import { Vector2 } from "babylonjs/Maths/math";
export class Tools {
    static LookForItems(item: any, selectedEntities: any[], firstIteration?: boolean): boolean;
    private static _RecursiveRemoveHiddenMeshesAndHoistChildren;
    static SortAndFilter(parent: any, items: any[]): any[];
    static GetCellInfo(grid: Grid, control: Control): Vector2;
    static ReorderGrid(grid: Grid, index: number, control: Control, cell: Vector2): void;
}

}
declare module "babylonjs-gui-editor/workbenchEditor" {
import * as React from "react";
import { GlobalState } from "babylonjs-gui-editor/globalState";
import { Control } from "babylonjs-gui/2D/controls/control";
import "babylonjs-gui-editor/main.scss";
import "babylonjs-gui-editor/scss/header.scss";
interface IGraphEditorProps {
    globalState: GlobalState;
}
interface IGraphEditorState {
    showPreviewPopUp: boolean;
    toolbarExpand: boolean;
    message: string;
}
export class WorkbenchEditor extends React.Component<IGraphEditorProps, IGraphEditorState> {
    private _moveInProgress;
    private _leftWidth;
    private _rightWidth;
    private _popUpWindow;
    private _draggedItem;
    private _rootRef;
    private _onErrorMessageObserver;
    componentDidMount(): void;
    componentWillUnmount(): void;
    addToolControls: (evt: KeyboardEvent) => void;
    removePressToolControls: (evt: KeyboardEvent) => void;
    constructor(props: IGraphEditorProps);
    showWaitScreen(): void;
    hideWaitScreen(): void;
    onPointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
    onPointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
    resizeColumns(evt: React.PointerEvent<HTMLDivElement>, forLeft?: boolean): void;
    buildColumnLayout(): string;
    handlePopUp: () => void;
    handleClosingPopUp: () => void;
    createPopupWindow: (title: string, windowVariableName: string, width?: number, height?: number) => Window | null;
    copyStyles: (sourceDoc: HTMLDocument, targetDoc: HTMLDocument) => void;
    switchExpandedState(): void;

    onCreate(value: string): Control;

    createToolbarHelper(ct: {
        className: string;
        icon: string;


}
export {};

}
declare module "babylonjs-gui-editor/colorPicker/colorComponentEntry" {
import * as React from "react";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
export interface IColorComponentEntryProps {
    value: number;
    label: string;
    max?: number;
    min?: number;
    onChange: (value: number) => void;
    disabled?: boolean;
    lockObject: LockObject;
}
export class ColorComponentEntry extends React.Component<IColorComponentEntryProps> {
    constructor(props: IColorComponentEntryProps);
    updateValue(valueString: string): void;
    lock(): void;
    unlock(): void;

}

}
declare module "babylonjs-gui-editor/colorPicker/colorPicker" {
import * as React from "react";
import { Color3, Color4 } from "babylonjs/Maths/math.color";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import "babylonjs-gui-editor/colorPicker/colorPicker.scss";
/**
 * Interface used to specify creation options for color picker
 */
export interface IColorPickerProps {
    color: Color3 | Color4;
    linearhint?: boolean;
    debugMode?: boolean;
    onColorChanged?: (color: Color3 | Color4) => void;
    lockObject: LockObject;
}
/**
 * Interface used to specify creation options for color picker
 */
export interface IColorPickerState {
    color: Color3;
    alpha: number;
}
/**
 * Class used to create a color picker
 */
export class ColorPicker extends React.Component<IColorPickerProps, IColorPickerState> {
    private _saturationRef;
    private _hueRef;
    private _isSaturationPointerDown;
    private _isHuePointerDown;
    constructor(props: IColorPickerProps);
    shouldComponentUpdate(nextProps: IColorPickerProps, nextState: IColorPickerState): boolean;
    onSaturationPointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
    onSaturationPointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
    onSaturationPointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
    onHuePointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
    onHuePointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
    onHuePointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
    private _evaluateSaturation;
    private _evaluateHue;
    componentDidUpdate(): void;
    raiseOnColorChanged(): void;

}

}
declare module "babylonjs-gui-editor/colorPicker/hexColor" {
import * as React from "react";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
export interface IHexColorProps {
    value: string;
    expectedLength: number;
    onChange: (value: string) => void;
    lockObject: LockObject;
}
export class HexColor extends React.Component<IHexColorProps, {
    hex: string;
}> {
    constructor(props: IHexColorProps);
    shouldComponentUpdate(nextProps: IHexColorProps, nextState: {
        hex: string;
    }): boolean;
    lock(): void;
    unlock(): void;
    updateHexValue(valueString: string): void;

}

}
declare module "babylonjs-gui-editor/components/bars/CommandBarComponent" {
import { FC } from "react";
export interface ICommandBarComponentProps {
    onSaveButtonClicked?: () => void;
    onSaveToSnippetButtonClicked?: () => void;
    onLoadFromSnippetButtonClicked?: () => void;
    onHelpButtonClicked?: () => void;
    onGiveFeedbackButtonClicked?: () => void;
    onSelectButtonClicked?: () => void;
    onPanButtonClicked?: () => void;
    onZoomButtonClicked?: () => void;
    onFitButtonClicked?: () => void;
    onArtboardColorChanged?: (newColor: string) => void;
    artboardColor?: string;
    artboardColorPickerColor?: string;
}
export const CommandBarComponent: FC<ICommandBarComponentProps>;

}
declare module "babylonjs-gui-editor/components/bars/CommandButtonComponent" {
import * as React from "react";
export interface ICommandButtonComponentProps {
    tooltip: string;
    shortcut?: string;
    icon: string;
    iconLabel?: string;
    isActive: boolean;
    onClick: () => void;
    disabled?: boolean;
}
export const CommandButtonComponent: React.FC<ICommandButtonComponentProps>;

}
declare module "babylonjs-gui-editor/components/bars/CommandDropdownComponent" {
import * as React from "react";
interface ICommandDropdownComponentProps {
    icon?: string;
    tooltip: string;
    defaultValue?: string;
    items: {
        label: string;
        icon?: string;
        fileButton?: boolean;
        onClick?: () => void;
        onCheck?: (value: boolean) => void;
        storeKey?: string;
        isActive?: boolean;
        defaultValue?: boolean | string;
        subItems?: string[];
    }[];
    toRight?: boolean;
}
export class CommandDropdownComponent extends React.Component<ICommandDropdownComponentProps, {
    isExpanded: boolean;
    activeState: string;
}> {
    constructor(props: ICommandDropdownComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/components/Button" {
/// <reference types="react" />
export type ButtonProps = {
    disabled?: boolean;
    active?: boolean;
    onClick?: () => void;
    color: "light" | "dark";
    size: "default" | "small" | "wide" | "smaller";
    title?: string;
    backgroundColor?: string;
};
export const Button: React.FC<ButtonProps>;

}
declare module "babylonjs-gui-editor/components/classNames" {
export function ClassNames(names: any, styleObject: any): string;
export function JoinClassNames(styleObject: any, ...names: string[]): string;

}
declare module "babylonjs-gui-editor/components/colorPicker/ColorComponentEntry" {
import * as React from "react";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
export interface IColorComponentEntryProps {
    value: number;
    label: string;
    max?: number;
    min?: number;
    onChange: (value: number) => void;
    disabled?: boolean;
    lockObject: LockObject;
}
export class ColorComponentComponentEntry extends React.Component<IColorComponentEntryProps> {
    constructor(props: IColorComponentEntryProps);
    updateValue(valueString: string): void;
    lock(): void;
    unlock(): void;

}

}
declare module "babylonjs-gui-editor/components/colorPicker/ColorPicker" {
import * as React from "react";
import { Color3, Color4 } from "babylonjs/Maths/math.color";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
/**
 * Interface used to specify creation options for color picker
 */
export interface IColorPickerComponentProps {
    color: Color3 | Color4;
    linearhint?: boolean;
    debugMode?: boolean;
    onColorChanged?: (color: Color3 | Color4) => void;
    lockObject: LockObject;
    backgroundColor?: string;
}
/**
 * Interface used to specify creation options for color picker
 */
export interface IColorPickerState {
    color: Color3;
    alpha: number;
}
/**
 * Class used to create a color picker
 */
export class ColorPickerComponent extends React.Component<IColorPickerComponentProps, IColorPickerState> {
    private _saturationRef;
    private _hueRef;
    private _isSaturationPointerDown;
    private _isHuePointerDown;
    constructor(props: IColorPickerComponentProps);
    shouldComponentUpdate(nextProps: IColorPickerComponentProps, nextState: IColorPickerState): boolean;
    onSaturationPointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
    onSaturationPointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
    onSaturationPointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
    onHuePointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
    onHuePointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
    onHuePointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
    private _evaluateSaturation;
    private _evaluateHue;
    componentDidUpdate(): void;
    raiseOnColorChanged(): void;

}

}
declare module "babylonjs-gui-editor/components/colorPicker/HexColor" {
import * as React from "react";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
export interface IHexColorProps {
    value: string;
    expectedLength: number;
    onChange: (value: string) => void;
    lockObject: LockObject;
}
export class HexColorComponent extends React.Component<IHexColorProps, {
    hex: string;
}> {
    constructor(props: IHexColorProps);
    shouldComponentUpdate(nextProps: IHexColorProps, nextState: {
        hex: string;
    }): boolean;
    lock(): void;
    unlock(): void;
    updateHexValue(valueString: string): void;

}

}
declare module "babylonjs-gui-editor/components/Icon" {
/// <reference types="react" />
export type IconProps = {
    color?: "dark" | "light";
    icon: string;
};
export const Icon: React.FC<IconProps>;

}
declare module "babylonjs-gui-editor/components/Label" {
import { ReactChild } from "react";
export type LabelProps = {
    text: string;
    children?: ReactChild;
    color?: "dark" | "light";
};
export const Label: React.FC<LabelProps>;

}
declare module "babylonjs-gui-editor/components/layout/DraggableIcon" {
import { FC } from "react";
import { ElementTypes, TabDrag } from "babylonjs-gui-editor/components/layout/types";
/**
 * Arguments for the DraggableIcon component.
 */
export interface IDraggableIconProps {
    /**
     * Icon source
     */
    src: string;
    /**
     * Object that will be passed to the drag event
     */
    item: TabDrag;
    /**
     * Type of drag event
     */
    type: ElementTypes;
}
/**
 * An icon that can be dragged by the user
 * @param props properties
 * @returns draggable icon element
 */
export const DraggableIcon: FC<IDraggableIconProps>;

}
declare module "babylonjs-gui-editor/components/layout/FlexibleColumn" {
import { FC } from "react";
/**
 * Arguments for the Column component.
 */
export interface IFlexibleColumnProps {
    /**
     * Width of column
     */
    width: string;
}
/**
 * This component represents a single column in the layout. It receives a width
 * that it occupies and the content to display
 * @param props
 * @returns
 */
export const FlexibleColumn: FC<IFlexibleColumnProps>;

}
declare module "babylonjs-gui-editor/components/layout/FlexibleDragHandler" {
import { FC } from "react";
/**
 * Arguments for the DragHandler component.
 */
export interface IFlexibleDragHandlerProps {
    /**
     * The size of the containing element. Used to calculate the percentage of
     * space occupied by the component
     */
    containerSize: {
        width: number;
        height: number;
    };
}
/**
 * This component receives the drop events and updates the layout accordingly
 * @param props properties
 * @returns DragHandler element
 */
export const FlexibleDragHandler: FC<IFlexibleDragHandlerProps>;

}
declare module "babylonjs-gui-editor/components/layout/FlexibleDropZone" {
import { FC } from "react";
/**
 * Arguments for the FlexibleDropZone component.
 */
export interface IFlexibleDropZoneProps {
    /**
     * The row number of the component in the layout
     */
    rowNumber: number;
    /**
     * The column number of the component in the layout
     */
    columnNumber: number;
}
/**
 * This component contains the drag and drop zone for the resize bars that
 * allow redefining width and height of layout elements
 * @param props properties
 * @returns drop zone element
 */
export const FlexibleDropZone: FC<IFlexibleDropZoneProps>;

}
declare module "babylonjs-gui-editor/components/layout/FlexibleGridContainer" {
import { FC } from "react";
/**
 * Arguments for the GridContainer component.
 */
export interface IFlexibleGridContainerProps {
}
/**
 * Component responsible for mapping the layout to the actual components
 * @returns GridContainer element
 */
export const FlexibleGridContainer: FC<IFlexibleGridContainerProps>;

}
declare module "babylonjs-gui-editor/components/layout/FlexibleGridLayout" {
import { FC } from "react";
import { Layout } from "babylonjs-gui-editor/components/layout/types";
/**
 * Arguments for the Layout component.
 */
export interface IFlexibleGridLayoutProps {
    /**
     * A definition of the layout which can be changed by the user
     */
    layoutDefinition: Layout;
}
/**
 * This component represents a grid layout that can be resized and rearranged
 * by the user.
 * @param props properties
 * @returns layout element
 */
export const FlexibleGridLayout: FC<IFlexibleGridLayoutProps>;

}
declare module "babylonjs-gui-editor/components/layout/FlexibleResizeBar" {
import { FC } from "react";
import { ResizeDirections } from "babylonjs-gui-editor/components/layout/types";
/**
 * Arguments for the ResizeBar component.
 */
export interface IFlexibleRowResizerProps {
    /**
     * Row number of the component that is being resized
     */
    rowNumber: number;
    /**
     * Column number of the component being resized
     */
    columnNumber: number;
    /**
     * If the resizing happens in row or column direction
     */
    direction: ResizeDirections;
}
/**
 * The item that will be sent to the drag event
 */
export type ResizeItem = {
    /**
     * If the resizing happens in row or column direction
     */
    direction: ResizeDirections;
    /**
     * The row number of the component that is being resized
     */
    rowNumber: number;
    /**
     * the column number of the component being resized
     */
    columnNumber: number;
};
/**
 * A component that renders a bar that the user can drag to resize.
 * @param props properties
 * @returns resize bar element
 */
export const FlexibleResizeBar: FC<IFlexibleRowResizerProps>;

}
declare module "babylonjs-gui-editor/components/layout/FlexibleTab" {
import { FC } from "react";
import { TabDrag } from "babylonjs-gui-editor/components/layout/types";
/**
 * Arguments for the FlexibleTab component.
 */
export interface IFlexibleTabProps {
    /**
     * The tab's title.
     */
    title: string;
    /**
     * If the tab is currently selected or not
     */
    selected: boolean;
    /**
     * What happens when the user clicks on the tab
     */
    onClick: () => void;
    /**
     * The object that will be sent to the drag event
     */
    item: TabDrag;
    /**
     * What happens when the user drops another tab after this one
     */
    onTabDroppedAction: (item: TabDrag) => void;
}
/**
 * A component that renders a tab that the user can click
 * to activate or drag to reorder. It also listens for
 * drop events if the user wants to drop another tab
 * after it.
 * @param props properties
 * @returns FlexibleTab element
 */
export const FlexibleTab: FC<IFlexibleTabProps>;

}
declare module "babylonjs-gui-editor/components/layout/FlexibleTabsContainer" {
import { FC } from "react";
import { LayoutTab } from "babylonjs-gui-editor/components/layout/types";
/**
 * Arguments for the TabsContainer component.
 */
export interface IFlexibleTabsContainerProps {
    /**
     * The tabs to display
     */
    tabs: LayoutTab[];
    /**
     * Row index of component in layout
     */
    rowIndex: number;
    /**
     * Column index of component in layout
     */
    columnIndex: number;
    /**
     * Which tab is selected in the layout
     */
    selectedTab?: string;
}
/**
 * This component contains a set of tabs of which only one is visible at a time.
 * The tabs can also be dragged from and to different containers.
 * @param props properties
 * @returns tabs container element
 */
export const FlexibleTabsContainer: FC<IFlexibleTabsContainerProps>;

}
declare module "babylonjs-gui-editor/components/layout/LayoutContext" {
/// <reference types="react" />
import { Layout } from "babylonjs-gui-editor/components/layout/types";
export const LayoutContext: import("react").Context<{
    /**
     * The layout object
     */
    layout: Layout;
    /**
     * Function to set the layout object in the context
     */
    setLayout: (layout: Layout) => void;
}>;

}
declare module "babylonjs-gui-editor/components/layout/types" {
import { ReactElement } from "react";
export type LayoutTab = {
    /**
     * Tab id
     */
    id: string;
    /**
     * React component rendered by tab
     */
    component: ReactElement;
    /**
     * Tab title
     */
    title: string;
};
export type LayoutTabsRow = {
    /**
     * row id
     */
    id: string;
    /**
     * row height in its containing column
     */
    height: string;
    /**
     * selected tab in row
     */
    selectedTab: string;
    /**
     * list of tabs contained in row
     */
    tabs: LayoutTab[];
};
export type LayoutColumn = {
    /**
     * column id
     */
    id: string;
    /**
     * column width in the grid
     */
    width: string;
    /**
     * column rows
     */
    rows: LayoutTabsRow[];
};
export type Layout = {
    /**
     * layout columns
     */
    columns?: LayoutColumn[];
};
export type TabDrag = {
    /**
     * row number of the tab being dragged
     */
    rowNumber: number;
    /**
     * column number of the tab being dragged
     */
    columnNumber: number;
    /**
     * the tabs being dragged
     */
    tabs: {
        /**
         * id of tab being dragged
         */
        id: string;
    }[];
};
export enum ElementTypes {
    RESIZE_BAR = "0",
    TAB = "1",
    TAB_GROUP = "2",
    NONE = "2"
}
export enum ResizeDirections {
    ROW = "row",
    COLUMN = "column"
}

}
declare module "babylonjs-gui-editor/components/layout/utils" {
import { Layout, LayoutColumn, LayoutTabsRow } from "babylonjs-gui-editor/components/layout/types";
/**
 * Given a column and row number in the layout, return the corresponding column/row
 * @param layout
 * @param column
 * @param row
 * @returns
 */
export const getPosInLayout: (layout: Layout, column: number, row?: number) => LayoutColumn | LayoutTabsRow;
/**
 * Remove a row in position row, column from the layout, and redistribute heights of remaining rows
 * @param layout
 * @param column
 * @param row
 */
export const removeLayoutRowAndRedistributePercentages: (layout: Layout, column: number, row: number) => void;
/**
 * Add a percentage string to a number
 * @param p1 the percentage string
 * @param p2 the number
 * @returns the sum of the percentage string and the number
 */
export const addPercentageStringToNumber: (p1: string, p2: number) => number;
/**
 * Parses a percentage string into a number
 * @param p the percentage string
 * @returns the parsed number
 */
export const parsePercentage: (p: string) => number;

}
declare module "babylonjs-gui-editor/components/lines/ColorLineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { Color4 } from "babylonjs/Maths/math.color";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
export interface IColorLineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    onPropertyChangedObservable: Observable<PropertyChangedEvent>;
    onChange?: () => void;
    isLinear?: boolean;
    icon?: string;
    iconLabel?: string;
    disableAlpha?: boolean;
    lockObject: LockObject;
}
interface IColorLineComponentState {
    isExpanded: boolean;
    color: Color4;
}
export class ColorLineComponent extends React.Component<IColorLineComponentProps, IColorLineComponentState> {
    constructor(props: IColorLineComponentProps);
    shouldComponentUpdate(nextProps: IColorLineComponentProps, nextState: IColorLineComponentState): boolean;
    getValue(props?: Readonly<IColorLineComponentProps> & Readonly<{
        children?: React.ReactNode;
    }>): Color4;
    setColorFromString(colorString: string): void;
    setColor(newColor: Color4): void;
    switchExpandState(): void;
    updateStateR(value: number): void;
    updateStateG(value: number): void;
    updateStateB(value: number): void;
    updateStateA(value: number): void;
    copyToClipboard(): void;
    private _convertToColor;
    private _toColor3;

}
export {};

}
declare module "babylonjs-gui-editor/components/lines/ColorPickerLineComponent" {
import * as React from "react";
import { Color4, Color3 } from "babylonjs/Maths/math.color";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
export interface IColorPickerLineComponentProps {
    value: Color4 | Color3;
    linearHint?: boolean;
    onColorChanged: (newOne: string) => void;
    icon?: string;
    iconLabel?: string;
    shouldPopRight?: boolean;
    lockObject?: LockObject;
    backgroundColor?: string;
}
interface IColorPickerComponentState {
    pickerEnabled: boolean;
    color: Color3 | Color4;
    hex: string;
}
export class ColorPickerLineComponent extends React.Component<IColorPickerLineComponentProps, IColorPickerComponentState> {
    private _floatRef;
    private _floatHostRef;
    private _coverRef;
    constructor(props: IColorPickerLineComponentProps);
    syncPositions(): void;
    shouldComponentUpdate(nextProps: IColorPickerLineComponentProps, nextState: IColorPickerComponentState): boolean;
    getHexString(props?: Readonly<IColorPickerLineComponentProps> & Readonly<{
        children?: React.ReactNode;
    }>): string;
    componentDidUpdate(): void;
    componentDidMount(): void;

}
export {};

}
declare module "babylonjs-gui-editor/components/lines/FileButtonLineComponent" {
import * as React from "react";
export interface IFileButtonLineComponentProps {
    label: string;
    onClick: (file: File) => void;
    accept: string;
    icon?: string;
    iconLabel?: string;
}
export class FileButtonLineComponent extends React.Component<IFileButtonLineComponentProps> {
    private static _IDGenerator;
    private _id;
    private _uploadInputRef;
    constructor(props: IFileButtonLineComponentProps);
    onChange(evt: any): void;

}

}
declare module "babylonjs-gui-editor/components/lines/NumericInputComponent" {
import * as React from "react";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
interface INumericInputComponentProps {
    label: string;
    value: number;
    step?: number;
    onChange: (value: number) => void;
    precision?: number;
    icon?: string;
    iconLabel?: string;
    lockObject: LockObject;
}
export class NumericInputComponent extends React.Component<INumericInputComponentProps, {
    value: string;
}> {
    static defaultProps: {
        step: number;
    };
    private _localChange;
    constructor(props: INumericInputComponentProps);
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: INumericInputComponentProps, nextState: {
        value: string;
    }): boolean;
    updateValue(valueString: string): void;
    onBlur(): void;
    incrementValue(amount: number): void;
    onKeyDown(evt: React.KeyboardEvent<HTMLInputElement>): void;

}
export {};

}
declare module "babylonjs-gui-editor/components/lines/OptionsLineComponent" {
/**
 * This components represents an options menu with optional
 * customizable properties. Option IDs should be unique.
 */
export interface IOption {
    label: string;
    value: string;
    id: string;
}
export interface IOptionsLineComponentProps {
    options: IOption[];
    addOptionPlaceholder?: string;
    onOptionAdded?: (newOption: IOption) => void;
    onOptionSelected: (selectedOptionValue: string) => void;
    selectedOptionValue: string;
    validateNewOptionValue?: (newOptionValue: string) => boolean;
    addOptionText?: string;
}


}
declare module "babylonjs-gui-editor/components/MessageDialog" {
import * as React from "react";
export interface MessageDialogProps {
    message: string;
    isError: boolean;
    onClose?: () => void;
}
export const MessageDialog: React.FC<MessageDialogProps>;

}
declare module "babylonjs-gui-editor/components/reactGraphSystem/GraphConnectorHandle" {
import { FC } from "react";
/**
 * Props for the connector
 */
export interface IGraphConnectorHandlerProps {
    /**
     * id of the parent node
     */
    parentId: string;
    /**
     * x position of the parent node
     */
    parentX: number;
    /**
     * y position of the parent node
     */
    parentY: number;
    /**
     * x position of the connector relative to the parent node
     */
    offsetX?: number;
    /**
     * y position of the connector relative to the parent node
     */
    offsetY?: number;
    /**
     * width of the parent node
     */
    parentWidth: number;
    /**
     * height of the parent node
     */
    parentHeight: number;
    /**
     * id of the container where its parent node is
     */
    parentContainerId: string;
}
/**
 * This component is used to initiate a connection between two nodes. Simply
 * drag the handle in a node and drop it in another node to create a connection.
 * @returns connector element
 */
export const GraphConnectorHandler: FC<IGraphConnectorHandlerProps>;

}
declare module "babylonjs-gui-editor/components/reactGraphSystem/GraphContainer" {
import { FC } from "react";
export interface IGraphContainerProps {
}
/**
 * This component is just a simple container to keep the nodes and lines containers
 * together
 * @param props
 * @returns
 */
export const GraphContainer: FC<IGraphContainerProps>;

}
declare module "babylonjs-gui-editor/components/reactGraphSystem/GraphContextManager" {
/// <reference types="react" />
/**
 * this context is used to pass callbacks to the graph nodes and connections
 */
export interface IGraphContext {
    onNodesConnected?: (sourceId: string, targetId: string) => void;
    onLineSelected?: (lineId: string) => void;
    onNodeSelected?: (nodeId: string) => void;
}
export const GraphContextManager: import("react").Context<IGraphContext>;

}
declare module "babylonjs-gui-editor/components/reactGraphSystem/GraphLine" {
import { FC } from "react";
/**
 * props for the GraphLine component
 */
export interface IGraphLineProps {
    /**
     * id of the line. temporary lines can have no id
     */
    id?: string;
    /**
     * starting x pos of the line
     */
    x1: number;
    /**
     * ending x pos of the line
     */
    x2: number;
    /**
     * starting y pos of the line
     */
    y1: number;
    /**
     * ending y pos of the line
     */
    y2: number;
    /**
     * is the line selected
     */
    selected?: boolean;
    /**
     * does the line have a direction
     */
    directional?: boolean;
}
export const MarkerArrowId = "arrow";
/**
 * This component draws a SVG line between two points, with an optional marker
 * indicating direction
 * @param props properties
 * @returns graph line element
 */
export const GraphLine: FC<IGraphLineProps>;

}
declare module "babylonjs-gui-editor/components/reactGraphSystem/GraphLinesContainer" {
import { FC } from "react";
/**
 * props for the GraphLineContainer
 */
export interface IGraphLinesContainerProps {
    /**
     * id of the container
     */
    id: string;
}
/**
 * this component handles the dragging of new connections
 * @param props
 * @returns
 */
export const GraphLinesContainer: FC<IGraphLinesContainerProps>;

}
declare module "babylonjs-gui-editor/components/reactGraphSystem/GraphNode" {
import { FC } from "react";
export interface IGraphNodeProps {
    id: string;
    name: string;
    x: number;
    y: number;
    selected?: boolean;
    width?: number;
    height?: number;
    highlighted?: boolean;
    parentContainerId: string;
}
export const SingleGraphNode: FC<IGraphNodeProps>;

}
declare module "babylonjs-gui-editor/components/reactGraphSystem/GraphNodesContainer" {
import { FC } from "react";
export interface IGraphContainerProps {
    onNodeMoved: (id: string, x: number, y: number) => void;
    id: string;
}
/**
 * This component contains all the nodes and handles their dragging
 * @param props properties
 * @returns graph node container element
 */
export const GraphNodesContainer: FC<IGraphContainerProps>;

}
declare module "babylonjs-gui-editor/components/reactGraphSystem/NodeRenderer" {
import { ComponentType } from "react";
import { Nullable } from "babylonjs/types";
export type IVisualRecordsType = Record<string, {
    x: number;
    y: number;
}>;
export type IConnectionType = {
    id: string;
    sourceId: string;
    targetId: string;
};
export type ICustomDataType = {
    type: string;
    value: any;
};
export type INodeType = {
    id: string;
    label: string;
    customData?: ICustomDataType;
};
/**
 * props for the node renderer
 */
export interface INodeRendererProps {
    /**
     * array of connections between nodes
     */
    connections: IConnectionType[];
    /**
     * function called when a new connection is created
     */
    updateConnections: (sourceId: string, targetId: string) => void;
    /**
     * function called when a connection is deleted
     */
    deleteLine: (lineId: string) => void;
    /**
     * function called when a node is deleted
     */
    deleteNode: (nodeId: string) => void;
    /**
     * array of all nodes
     */
    nodes: INodeType[];
    /**
     * id of the node to highlight
     */
    highlightedNode?: Nullable<string>;
    /**
     * function to be called if a node is selected
     */
    selectNode?: (nodeId: Nullable<string>) => void;
    /**
     * id of this renderer
     */
    id: string;
    /**
     * optional list of custom components to be rendered inside nodes of
     * a certain type
     */
    customComponents?: Record<string, ComponentType<any>>;
}
/**
 * This component is a bridge between the app logic related to the graph, and the actual rendering
 * of it. It manages the nodes' positions and selection states.
 * @param props
 * @returns
 */


}
declare module "babylonjs-gui-editor/components/reactGraphSystem/useGraphContext" {
/**
 * utility hook to assist using the graph context
 * @returns
 */
export const useGraphContext: () => import("babylonjs-gui-editor/components/reactGraphSystem/GraphContextManager").IGraphContext;

}
declare module "babylonjs-gui-editor/components/TextInputWithSubmit" {
export interface ITextInputProps {
    label?: string;
    placeholder?: string;
    submitValue: (newValue: string) => void;
    validateValue?: (value: string) => boolean;
    cancelSubmit?: () => void;
}
/**
 * This component represents a text input that can be submitted or cancelled on buttons
 * @param props properties
 * @returns TextInputWithSubmit element
 */


}
declare module "babylonjs-gui-editor/components/Toggle" {
/// <reference types="react" />
export type ToggleProps = {
    toggled: "on" | "mixed" | "off";
    onToggle?: () => void;
    padded?: boolean;
    color?: "dark" | "light";
};
export const Toggle: React.FC<ToggleProps>;

}
declare module "babylonjs-gui-editor/copyCommandToClipboard" {
export function copyCommandToClipboard(strCommand: string): void;
export function getClassNameWithNamespace(obj: any): {
    className: string;
    babylonNamespace: string;
};

}
declare module "babylonjs-gui-editor/lines/booleanLineComponent" {
import * as React from "react";
export interface IBooleanLineComponentProps {
    label: string;
    value: boolean;
    icon?: string;
    iconLabel?: string;
}
export class BooleanLineComponent extends React.Component<IBooleanLineComponentProps> {
    constructor(props: IBooleanLineComponentProps);

}

}
declare module "babylonjs-gui-editor/lines/buttonLineComponent" {
import * as React from "react";
export interface IButtonLineComponentProps {
    label: string;
    onClick: () => void;
    icon?: string;
    iconLabel?: string;
    isDisabled?: boolean;
}
export class ButtonLineComponent extends React.Component<IButtonLineComponentProps> {
    constructor(props: IButtonLineComponentProps);

}

}
declare module "babylonjs-gui-editor/lines/checkBoxLineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";

export interface ICheckBoxLineComponentProps {
    label?: string;
    target?: any;
    propertyName?: string;
    isSelected?: () => boolean;
    onSelect?: (value: boolean) => void;
    onValueChanged?: () => void;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    disabled?: boolean;
    icon?: string;
    iconLabel?: string;
    faIcons?: {
        enabled: any;
        disabled: any;
    };
    large?: boolean;
}
export class CheckBoxLineComponent extends React.Component<ICheckBoxLineComponentProps, {
    isSelected: boolean;
    isDisabled?: boolean;
    isConflict: boolean;
}> {
    private _localChange;
    constructor(props: ICheckBoxLineComponentProps);
    shouldComponentUpdate(nextProps: ICheckBoxLineComponentProps, nextState: {
        isSelected: boolean;
        isDisabled: boolean;
        isConflict: boolean;
    }): boolean;
    onChange(): void;
    onCopyClick(): void;

}

}
declare module "babylonjs-gui-editor/lines/color3LineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
export interface IColor3LineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    isLinear?: boolean;
    icon?: string;
    lockObject: LockObject;
    iconLabel?: string;
    onChange?: () => void;
}
export class Color3LineComponent extends React.Component<IColor3LineComponentProps> {

}

}
declare module "babylonjs-gui-editor/lines/color4LineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
export interface IColor4LineComponentProps {
    label: string;
    target?: any;
    propertyName: string;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onChange?: () => void;
    isLinear?: boolean;
    icon?: string;
    iconLabel?: string;
    lockObject: LockObject;
}
export class Color4LineComponent extends React.Component<IColor4LineComponentProps> {

}

}
declare module "babylonjs-gui-editor/lines/colorLineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { Color4 } from "babylonjs/Maths/math.color";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
export interface IColorLineProps {
    label: string;
    target?: any;
    propertyName: string;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    onChange?: () => void;
    isLinear?: boolean;
    icon?: string;
    iconLabel?: string;
    disableAlpha?: boolean;
    lockObject: LockObject;
}
interface IColorLineComponentState {
    isExpanded: boolean;
    color: Color4;
}
export class ColorLine extends React.Component<IColorLineProps, IColorLineComponentState> {
    constructor(props: IColorLineProps);
    shouldComponentUpdate(nextProps: IColorLineProps, nextState: IColorLineComponentState): boolean;
    getValue(props?: Readonly<IColorLineProps> & Readonly<{
        children?: React.ReactNode;
    }>): Color4;
    setColorFromString(colorString: string): void;
    setColor(newColor: Color4): void;
    switchExpandState(): void;
    updateStateR(value: number): void;
    updateStateG(value: number): void;
    updateStateB(value: number): void;
    updateStateA(value: number): void;
    private _convertToColor;
    private _toColor3;
    onCopyClick(): void;

}
export {};

}
declare module "babylonjs-gui-editor/lines/colorPickerComponent" {
import * as React from "react";
import { Color4, Color3 } from "babylonjs/Maths/math.color";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
export interface IColorPickerLineProps {
    value: Color4 | Color3;
    linearHint?: boolean;
    onColorChanged: (newOne: string) => void;
    icon?: string;
    iconLabel?: string;
    shouldPopRight?: boolean;
    lockObject?: LockObject;
}
interface IColorPickerComponentState {
    pickerEnabled: boolean;
    color: Color3 | Color4;
    hex: string;
}
export class ColorPickerLine extends React.Component<IColorPickerLineProps, IColorPickerComponentState> {
    private _floatRef;
    private _floatHostRef;
    constructor(props: IColorPickerLineProps);
    syncPositions(): void;
    shouldComponentUpdate(nextProps: IColorPickerLineProps, nextState: IColorPickerComponentState): boolean;
    getHexString(props?: Readonly<IColorPickerLineProps> & Readonly<{
        children?: React.ReactNode;
    }>): string;
    componentDidUpdate(): void;
    componentDidMount(): void;

}
export {};

}
declare module "babylonjs-gui-editor/lines/draggableLineComponent" {
import * as React from "react";
export interface IButtonLineComponentProps {
    data: string;
    tooltip: string;
}
export class DraggableLineComponent extends React.Component<IButtonLineComponentProps> {
    constructor(props: IButtonLineComponentProps);

}

}
declare module "babylonjs-gui-editor/lines/fileButtonLineComponent" {
import * as React from "react";
interface IFileButtonLineProps {
    label: string;
    onClick: (file: File) => void;
    accept: string;
    icon?: string;
    iconLabel?: string;
}
export class FileButtonLine extends React.Component<IFileButtonLineProps> {
    private static _IDGenerator;
    private _id;
    private _uploadInputRef;
    constructor(props: IFileButtonLineProps);
    onChange(evt: any): void;

}
export {};

}
declare module "babylonjs-gui-editor/lines/fileMultipleButtonLineComponent" {
import * as React from "react";
interface IFileMultipleButtonLineComponentProps {
    label: string;
    onClick: (event: any) => void;
    accept: string;
    icon?: string;
    iconLabel?: string;
}
export class FileMultipleButtonLineComponent extends React.Component<IFileMultipleButtonLineComponentProps> {
    private static _IDGenerator;
    private _id;
    private _uploadInputRef;
    constructor(props: IFileMultipleButtonLineComponentProps);
    onChange(evt: any): void;

}
export {};

}
declare module "babylonjs-gui-editor/lines/floatLineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
interface IFloatLineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    lockObject: LockObject;
    onChange?: (newValue: number) => void;
    isInteger?: boolean;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    additionalClass?: string;
    step?: string;
    digits?: number;
    useEuler?: boolean;
    min?: number;
    max?: number;
    smallUI?: boolean;
    onEnter?: (newValue: number) => void;
    icon?: string;
    iconLabel?: string;
    defaultValue?: number;
    arrows?: boolean;
    unit?: React.ReactNode;
    onDragStart?: (newValue: number) => void;
    onDragStop?: (newValue: number) => void;
    disabled?: boolean;
}
export class FloatLineComponent extends React.Component<IFloatLineComponentProps, {
    value: string;
    dragging: boolean;
}> {
    private _localChange;
    private _store;
    constructor(props: IFloatLineComponentProps);
    componentWillUnmount(): void;
    getValueString(value: any, props: IFloatLineComponentProps): string;
    shouldComponentUpdate(nextProps: IFloatLineComponentProps, nextState: {
        value: string;
        dragging: boolean;
    }): boolean;
    raiseOnPropertyChanged(newValue: number, previousValue: number): void;
    updateValue(valueString: string): void;
    lock(): void;
    unlock(): void;
    incrementValue(amount: number, processStep?: boolean): void;
    onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void;
    onCopyClick(): void;

}
export {};

}
declare module "babylonjs-gui-editor/lines/hexLineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
interface IHexLineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    lockObject?: LockObject;
    onChange?: (newValue: number) => void;
    isInteger?: boolean;
    replaySourceReplacement?: string;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    additionalClass?: string;
    step?: string;
    digits?: number;
    useEuler?: boolean;
    min?: number;
    icon?: string;
    iconLabel?: string;
}
export class HexLineComponent extends React.Component<IHexLineComponentProps, {
    value: string;
}> {
    private _localChange;
    private _store;
    private _propertyChange;
    constructor(props: IHexLineComponentProps);
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: IHexLineComponentProps, nextState: {
        value: string;
    }): boolean;
    raiseOnPropertyChanged(newValue: number, previousValue: number): void;
    convertToHexString(valueString: string): string;
    updateValue(valueString: string, raisePropertyChanged: boolean): void;
    lock(): void;
    unlock(): void;

}
export {};

}
declare module "babylonjs-gui-editor/lines/iconButtonLineComponent" {
import * as React from "react";
export interface IIconButtonLineComponentProps {
    icon: string;
    onClick: () => void;
    tooltip: string;
    active?: boolean;
}
export class IconButtonLineComponent extends React.Component<IIconButtonLineComponentProps> {
    constructor(props: IIconButtonLineComponentProps);

}

}
declare module "babylonjs-gui-editor/lines/iconComponent" {
import * as React from "react";
interface IIconComponentProps {
    icon: string;
    label?: string;
}
export class IconComponent extends React.Component<IIconComponentProps> {

}
export {};

}
declare module "babylonjs-gui-editor/lines/indentedTextLineComponent" {
import * as React from "react";
interface IIndentedTextLineComponentProps {
    value?: string;
    color?: string;
    underline?: boolean;
    onLink?: () => void;
    url?: string;
    additionalClass?: string;
}
export class IndentedTextLineComponent extends React.Component<IIndentedTextLineComponentProps> {
    constructor(props: IIndentedTextLineComponentProps);
    onLink(): void;


}
export {};

}
declare module "babylonjs-gui-editor/lines/inputArrowsComponent" {
import * as React from "react";
interface IInputArrowsComponentProps {
    incrementValue: (amount: number) => void;
    setDragging: (dragging: boolean) => void;
}
export class InputArrowsComponent extends React.Component<IInputArrowsComponentProps> {
    private _arrowsRef;
    private _drag;
    private _releaseListener;
    private _lockChangeListener;

}
export {};

}
declare module "babylonjs-gui-editor/lines/iSelectedLineContainer" {
export interface ISelectedLineContainer {
    selectedLineContainerTitles: Array<string>;
    selectedLineContainerTitlesNoFocus: Array<string>;
}

}
declare module "babylonjs-gui-editor/lines/lineContainerComponent" {
import * as React from "react";
import { ISelectedLineContainer } from "babylonjs-gui-editor/lines/iSelectedLineContainer";
interface ILineContainerComponentProps {
    selection?: ISelectedLineContainer;
    title: string;
    children: any[] | any;
    closed?: boolean;
}
export class LineContainerComponent extends React.Component<ILineContainerComponentProps, {
    isExpanded: boolean;
    isHighlighted: boolean;
}> {
    constructor(props: ILineContainerComponentProps);
    switchExpandedState(): void;

    componentDidMount(): void;

}
export {};

}
declare module "babylonjs-gui-editor/lines/linkButtonComponent" {
import * as React from "react";

interface ILinkButtonComponentProps {
    label: string;
    buttonLabel: string;
    url?: string;
    onClick: () => void;
    icon?: any;
    onIconClick?: () => void;
}
export class LinkButtonComponent extends React.Component<ILinkButtonComponentProps> {
    constructor(props: ILinkButtonComponentProps);
    onLink(): void;

}
export {};

}
declare module "babylonjs-gui-editor/lines/matrixLineComponent" {
import * as React from "react";
import { Vector3, Vector4 } from "babylonjs/Maths/math.vector";
import { Matrix } from "babylonjs/Maths/math.vector";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
interface IMatrixLineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    step?: number;
    onChange?: (newValue: Matrix) => void;
    onModeChange?: (mode: number) => void;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    mode?: number;
    lockObject: LockObject;
}
export class MatrixLineComponent extends React.Component<IMatrixLineComponentProps, {
    value: Matrix;
    mode: number;
    angle: number;
}> {
    private _localChange;
    constructor(props: IMatrixLineComponentProps);
    shouldComponentUpdate(nextProps: IMatrixLineComponentProps, nextState: {
        value: Matrix;
        mode: number;
        angle: number;
    }): boolean;
    raiseOnPropertyChanged(previousValue: Vector3): void;
    updateMatrix(): void;
    updateRow(value: Vector4, row: number): void;
    updateBasedOnMode(value: number): void;

}
export {};

}
declare module "babylonjs-gui-editor/lines/messageLineComponent" {
import * as React from "react";

interface IMessageLineComponentProps {
    text: string;
    color?: string;
    icon?: any;
}
export class MessageLineComponent extends React.Component<IMessageLineComponentProps> {
    constructor(props: IMessageLineComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/lines/numericInputComponent" {
import * as React from "react";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
interface INumericInputProps {
    label: string;
    value: number;
    step?: number;
    onChange: (value: number) => void;
    precision?: number;
    icon?: string;
    iconLabel?: string;
    lockObject: LockObject;
}
export class NumericInput extends React.Component<INumericInputProps, {
    value: string;
}> {
    static defaultProps: {
        step: number;
    };
    private _localChange;
    constructor(props: INumericInputProps);
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: INumericInputProps, nextState: {
        value: string;
    }): boolean;
    updateValue(valueString: string): void;
    onBlur(): void;
    incrementValue(amount: number): void;
    onKeyDown(evt: React.KeyboardEvent<HTMLInputElement>): void;

}
export {};

}
declare module "babylonjs-gui-editor/lines/optionsLineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { IInspectableOptions } from "babylonjs/Misc/iInspectable";
export const Null_Value: number;
export interface IOptionsLineProps {
    label: string;
    target: any;
    propertyName: string;
    options: IInspectableOptions[];
    noDirectUpdate?: boolean;
    onSelect?: (value: number | string) => void;
    extractValue?: (target: any) => number | string;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    allowNullValue?: boolean;
    icon?: string;
    iconLabel?: string;
    className?: string;
    valuesAreStrings?: boolean;
    defaultIfNull?: number;
}
export class OptionsLine extends React.Component<IOptionsLineProps, {
    value: number | string;
}> {
    private _localChange;
    private _remapValueIn;
    private _remapValueOut;
    private _getValue;
    constructor(props: IOptionsLineProps);
    shouldComponentUpdate(nextProps: IOptionsLineProps, nextState: {
        value: number;
    }): boolean;
    raiseOnPropertyChanged(newValue: number, previousValue: number): void;
    setValue(value: string | number): void;
    updateValue(valueString: string): void;
    onCopyClick(): void;

}

}
declare module "babylonjs-gui-editor/lines/popup" {
export class Popup {
    static CreatePopup(title: string, windowVariableName: string, width?: number, height?: number): HTMLDivElement | null;
    private static _CopyStyles;
}

}
declare module "babylonjs-gui-editor/lines/radioLineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
interface IRadioButtonLineComponentProps {
    onSelectionChangedObservable: Observable<RadioButtonLineComponent>;
    label: string;
    isSelected: () => boolean;
    onSelect: () => void;
    icon?: string;
    iconLabel?: string;
}
export class RadioButtonLineComponent extends React.Component<IRadioButtonLineComponentProps, {
    isSelected: boolean;
}> {
    private _onSelectionChangedObserver;
    constructor(props: IRadioButtonLineComponentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onChange(): void;

}
export {};

}
declare module "babylonjs-gui-editor/lines/sliderLineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
interface ISliderLineComponentProps {
    label: string;
    target?: any;
    propertyName?: string;
    minimum: number;
    maximum: number;
    step: number;
    directValue?: number;
    useEuler?: boolean;
    onChange?: (value: number) => void;
    onInput?: (value: number) => void;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    decimalCount?: number;
    margin?: boolean;
    icon?: string;
    iconLabel?: string;
    lockObject: LockObject;
    unit?: React.ReactNode;
}
export class SliderLineComponent extends React.Component<ISliderLineComponentProps, {
    value: number;
}> {
    private _localChange;
    constructor(props: ISliderLineComponentProps);
    shouldComponentUpdate(nextProps: ISliderLineComponentProps, nextState: {
        value: number;
    }): boolean;
    onChange(newValueString: any): void;
    onInput(newValueString: any): void;
    prepareDataToRead(value: number): number;
    onCopyClick(): void;

}
export {};

}
declare module "babylonjs-gui-editor/lines/targetsProxy" {
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { Observable } from "babylonjs/Misc/observable";
export const conflictingValuesPlaceholder = "\u2014";
/**
 *
 * @param targets a list of selected targets
 * @param onPropertyChangedObservable
 * @param getProperty
 * @returns a proxy object that can be passed as a target into the input
 */
export function makeTargetsProxy<Type>(targets: Type[], onPropertyChangedObservable?: Observable<PropertyChangedEvent>, getProperty?: (target: Type, property: keyof Type) => any): any;

}
declare module "babylonjs-gui-editor/lines/textInputLineComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
export interface ITextInputLineComponentProps {
    label?: string;
    lockObject?: LockObject;
    target?: any;
    propertyName?: string;
    value?: string;
    onChange?: (value: string) => void;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    icon?: string;
    iconLabel?: string;
    noUnderline?: boolean;
    numbersOnly?: boolean;
    delayInput?: boolean;
    arrows?: boolean;
    arrowsIncrement?: (amount: number) => void;
    step?: number;
    numeric?: boolean;
    roundValues?: boolean;
    min?: number;
    max?: number;
    placeholder?: string;
    unit?: React.ReactNode;
    validator?: (value: string) => boolean;
    multilines?: boolean;
    throttlePropertyChangedNotification?: boolean;
    throttlePropertyChangedNotificationDelay?: number;
    disabled?: boolean;
}
export class TextInputLineComponent extends React.Component<ITextInputLineComponentProps, {
    value: string;
    dragging: boolean;
}> {
    private _localChange;
    constructor(props: ITextInputLineComponentProps);
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: ITextInputLineComponentProps, nextState: {
        value: string;
        dragging: boolean;
    }): boolean;
    raiseOnPropertyChanged(newValue: string, previousValue: string): void;
    getCurrentNumericValue(value: string): number;
    updateValue(value: string, valueToValidate?: string): void;
    incrementValue(amount: number): void;
    onKeyDown(event: React.KeyboardEvent): void;

}

}
declare module "babylonjs-gui-editor/lines/textLineComponent" {
import * as React from "react";
interface ITextLineComponentProps {
    label?: string;
    value?: string;
    color?: string;
    underline?: boolean;
    onLink?: () => void;
    url?: string;
    ignoreValue?: boolean;
    additionalClass?: string;
    icon?: string;
    iconLabel?: string;
    tooltip?: string;
}
export class TextLineComponent extends React.Component<ITextLineComponentProps> {
    constructor(props: ITextLineComponentProps);
    onLink(): void;


}
export {};

}
declare module "babylonjs-gui-editor/lines/unitButton" {
interface IUnitButtonProps {
    unit: string;
    locked?: boolean;
    onClick?: (unit: string) => void;
}

export {};

}
declare module "babylonjs-gui-editor/lines/valueLineComponent" {
import * as React from "react";
interface IValueLineComponentProps {
    label: string;
    value: number;
    color?: string;
    fractionDigits?: number;
    units?: string;
    icon?: string;
    iconLabel?: string;
}
export class ValueLineComponent extends React.Component<IValueLineComponentProps> {
    constructor(props: IValueLineComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/lines/vector2LineComponent" {
import * as React from "react";
import { Vector2 } from "babylonjs/Maths/math.vector";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
interface IVector2LineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    step?: number;
    onChange?: (newvalue: Vector2) => void;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    icon?: string;
    iconLabel?: string;
    lockObject: LockObject;
}
export class Vector2LineComponent extends React.Component<IVector2LineComponentProps, {
    isExpanded: boolean;
    value: Vector2;
}> {
    static defaultProps: {
        step: number;
    };
    private _localChange;
    constructor(props: IVector2LineComponentProps);
    shouldComponentUpdate(nextProps: IVector2LineComponentProps, nextState: {
        isExpanded: boolean;
        value: Vector2;
    }): boolean;
    switchExpandState(): void;
    raiseOnPropertyChanged(previousValue: Vector2): void;
    updateStateX(value: number): void;
    updateStateY(value: number): void;

}
export {};

}
declare module "babylonjs-gui-editor/lines/vector3LineComponent" {
import * as React from "react";
import { Vector3 } from "babylonjs/Maths/math.vector";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
interface IVector3LineComponentProps {
    label: string;
    target: any;
    propertyName: string;
    step?: number;
    onChange?: (newvalue: Vector3) => void;
    useEuler?: boolean;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    noSlider?: boolean;
    icon?: string;
    iconLabel?: string;
    lockObject: LockObject;
}
export class Vector3LineComponent extends React.Component<IVector3LineComponentProps, {
    isExpanded: boolean;
    value: Vector3;
}> {
    static defaultProps: {
        step: number;
    };
    private _localChange;
    constructor(props: IVector3LineComponentProps);
    getCurrentValue(): any;
    shouldComponentUpdate(nextProps: IVector3LineComponentProps, nextState: {
        isExpanded: boolean;
        value: Vector3;
    }): boolean;
    switchExpandState(): void;
    raiseOnPropertyChanged(previousValue: Vector3): void;
    updateVector3(): void;
    updateStateX(value: number): void;
    updateStateY(value: number): void;
    updateStateZ(value: number): void;
    onCopyClick(): void;

}
export {};

}
declare module "babylonjs-gui-editor/lines/vector4LineComponent" {
import * as React from "react";
import { Vector4 } from "babylonjs/Maths/math.vector";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
interface IVector4LineComponentProps {
    label: string;
    target?: any;
    propertyName?: string;
    step?: number;
    onChange?: (newvalue: Vector4) => void;
    useEuler?: boolean;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
    icon?: string;
    iconLabel?: string;
    value?: Vector4;
    lockObject: LockObject;
}
export class Vector4LineComponent extends React.Component<IVector4LineComponentProps, {
    isExpanded: boolean;
    value: Vector4;
}> {
    static defaultProps: {
        step: number;
    };
    private _localChange;
    constructor(props: IVector4LineComponentProps);
    getCurrentValue(): any;
    shouldComponentUpdate(nextProps: IVector4LineComponentProps, nextState: {
        isExpanded: boolean;
        value: Vector4;
    }): boolean;
    switchExpandState(): void;
    raiseOnPropertyChanged(previousValue: Vector4): void;
    updateVector4(): void;
    updateStateX(value: number): void;
    updateStateY(value: number): void;
    updateStateZ(value: number): void;
    updateStateW(value: number): void;

}
export {};

}
declare module "babylonjs-gui-editor/nodeGraphSystem/displayLedger" {
export class DisplayLedger {
    static RegisteredControls: {
        [key: string]: any;
    };
}

}
declare module "babylonjs-gui-editor/nodeGraphSystem/frameNodePort" {
import { IDisplayManager } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/displayManager";
import { Observable } from "babylonjs/Misc/observable";
import { Nullable } from "babylonjs/types";
import { IPortData } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/portData";
import { NodePort } from "babylonjs-gui-editor/nodeGraphSystem/nodePort";
import { GraphNode } from "babylonjs-gui-editor/nodeGraphSystem/graphNode";
import { FramePortPosition } from "babylonjs-gui-editor/nodeGraphSystem/graphFrame";
import { StateManager } from "babylonjs-gui-editor/nodeGraphSystem/stateManager";
export class FrameNodePort extends NodePort {
    portData: IPortData;
    node: GraphNode;
    private _parentFrameId;
    private _isInput;
    private _framePortPosition;
    private _framePortId;
    private _onFramePortPositionChangedObservable;
    get parentFrameId(): number;
    get onFramePortPositionChangedObservable(): Observable<FrameNodePort>;
    get isInput(): boolean;
    get framePortId(): number;
    get framePortPosition(): FramePortPosition;
    set framePortPosition(position: FramePortPosition);
    constructor(portContainer: HTMLElement, portData: IPortData, node: GraphNode, stateManager: StateManager, isInput: boolean, framePortId: number, parentFrameId: number);
    static CreateFrameNodePortElement(portData: IPortData, node: GraphNode, root: HTMLElement, displayManager: Nullable<IDisplayManager>, stateManager: StateManager, isInput: boolean, framePortId: number, parentFrameId: number): FrameNodePort;
}

}
declare module "babylonjs-gui-editor/nodeGraphSystem/graphCanvas" {
import * as React from "react";
import { GraphNode } from "babylonjs-gui-editor/nodeGraphSystem/graphNode";
import { Nullable } from "babylonjs/types";
import { NodeLink } from "babylonjs-gui-editor/nodeGraphSystem/nodeLink";
import { NodePort } from "babylonjs-gui-editor/nodeGraphSystem/nodePort";
import { GraphFrame } from "babylonjs-gui-editor/nodeGraphSystem/graphFrame";
import { IEditorData, IFrameData } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/nodeLocationInfo";
import { StateManager } from "babylonjs-gui-editor/nodeGraphSystem/stateManager";
import { INodeData } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/nodeData";
import { IPortData } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/portData";
import { INodeContainer } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/nodeContainer";
export interface IGraphCanvasComponentProps {
    stateManager: StateManager;
    onEmitNewNode: (nodeData: INodeData) => GraphNode;
}
export class GraphCanvasComponent extends React.Component<IGraphCanvasComponentProps> implements INodeContainer {
    static readonly NodeWidth: number;
    private readonly _minZoom;
    private readonly _maxZoom;
    private _hostCanvasRef;
    private _hostCanvas;
    private _graphCanvasRef;
    private _graphCanvas;
    private _selectionContainerRef;
    private _selectionContainer;
    private _frameContainerRef;
    private _frameContainer;
    private _svgCanvasRef;
    private _svgCanvas;
    private _rootContainerRef;
    private _rootContainer;
    private _nodes;
    private _links;
    private _mouseStartPointX;
    private _mouseStartPointY;
    private _dropPointX;
    private _dropPointY;
    private _selectionStartX;
    private _selectionStartY;
    private _candidateLinkedHasMoved;
    private _x;
    private _y;
    private _zoom;
    private _selectedNodes;
    private _selectedLink;
    private _selectedPort;
    private _candidateLink;
    private _candidatePort;
    private _gridSize;
    private _selectionBox;
    private _selectedFrames;
    private _frameCandidate;
    private _frames;
    private _nodeDataContentList;
    private _altKeyIsPressed;
    private _multiKeyIsPressed;
    private _oldY;
    _frameIsMoving: boolean;
    _isLoading: boolean;
    _targetLinkCandidate: Nullable<NodeLink>;
    private _copiedNodes;
    private _copiedFrames;
    get gridSize(): number;
    set gridSize(value: number);
    get stateManager(): StateManager;
    get nodes(): GraphNode[];
    get links(): NodeLink[];
    get frames(): GraphFrame[];
    get zoom(): number;
    set zoom(value: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get selectedNodes(): GraphNode[];
    get selectedLink(): Nullable<NodeLink>;
    get selectedFrames(): GraphFrame[];
    get selectedPort(): Nullable<NodePort>;
    get canvasContainer(): HTMLDivElement;
    get hostCanvas(): HTMLDivElement;
    get svgCanvas(): HTMLElement;
    get selectionContainer(): HTMLDivElement;
    get frameContainer(): HTMLDivElement;
    private _selectedFrameAndNodesConflict;
    constructor(props: IGraphCanvasComponentProps);
    populateConnectedEntriesBeforeRemoval(item: GraphNode, items: GraphNode[], inputs: Nullable<IPortData>[], outputs: Nullable<IPortData>[]): void;
    automaticRewire(inputs: Nullable<IPortData>[], outputs: Nullable<IPortData>[], firstOnly?: boolean): void;
    smartAddOverLink(node: GraphNode, link: NodeLink): void;
    smartAddOverNode(node: GraphNode, source: GraphNode): void;
    deleteSelection(onRemove: (nodeData: INodeData) => void, autoReconnect?: boolean): void;
    handleKeyDown(evt: KeyboardEvent, onRemove: (nodeData: INodeData) => void, mouseLocationX: number, mouseLocationY: number, dataGenerator: (nodeData: INodeData) => any, rootElement: HTMLDivElement): void;
    pasteSelection(copiedNodes: GraphNode[], currentX: number, currentY: number, dataGenerator: (nodeData: INodeData) => any, selectNew?: boolean): GraphNode[];
    reconnectNewNodes(nodeIndex: number, newNodes: GraphNode[], sourceNodes: GraphNode[], done: boolean[]): void;
    getCachedData(): any[];
    removeDataFromCache(data: any): void;
    createNodeFromObject(nodeData: INodeData, onNodeCreated: (data: any) => void, recursion?: boolean): GraphNode;
    getGridPosition(position: number, useCeil?: boolean): number;
    getGridPositionCeil(position: number): number;
    updateTransform(): void;
    onKeyUp(): void;
    findNodeFromData(data: any): GraphNode;
    reset(): void;
    connectPorts(pointA: IPortData, pointB: IPortData): void;
    removeLink(link: NodeLink): void;
    appendNode(nodeData: INodeData): GraphNode;
    distributeGraph(): void;
    componentDidMount(): void;
    onMove(evt: React.PointerEvent): void;
    onDown(evt: React.PointerEvent<HTMLElement>): void;
    onUp(evt: React.PointerEvent): void;
    onWheel(evt: React.WheelEvent): void;
    zoomToFit(): void;
    processCandidatePort(): void;
    connectNodes(nodeA: GraphNode, pointA: IPortData, nodeB: GraphNode, pointB: IPortData): void;
    drop(newNode: GraphNode, targetX: number, targetY: number, offsetX: number, offsetY: number): void;
    processEditorData(editorData: IEditorData): void;
    reOrganize(editorData?: Nullable<IEditorData>, isImportingAFrame?: boolean): void;
    addFrame(frameData: IFrameData): void;

}

}
declare module "babylonjs-gui-editor/nodeGraphSystem/graphFrame" {
import { GraphNode } from "babylonjs-gui-editor/nodeGraphSystem/graphNode";
import { GraphCanvasComponent } from "babylonjs-gui-editor/nodeGraphSystem/graphCanvas";
import { Nullable } from "babylonjs/types";
import { Observable } from "babylonjs/Misc/observable";
import { Color3 } from "babylonjs/Maths/math.color";
import { FrameNodePort } from "babylonjs-gui-editor/nodeGraphSystem/frameNodePort";
import { IFrameData } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/nodeLocationInfo";
export enum FramePortPosition {
    Top = 0,
    Middle = 1,
    Bottom = 2
}
export class GraphFrame {
    private readonly _collapsedWidth;
    private static _FrameCounter;
    private static _FramePortCounter;
    private _name;
    private _color;
    private _x;
    private _y;
    private _gridAlignedX;
    private _gridAlignedY;
    private _width;
    private _height;
    element: HTMLDivElement;
    private _borderElement;
    private _headerElement;
    private _headerTextElement;
    private _headerCollapseElement;
    private _headerCloseElement;
    private _commentsElement;
    private _portContainer;
    private _outputPortContainer;
    private _inputPortContainer;
    private _nodes;
    private _ownerCanvas;
    private _mouseStartPointX;
    private _mouseStartPointY;
    private _onSelectionChangedObserver;
    private _onGraphNodeRemovalObserver;
    private _onExposePortOnFrameObserver;
    private _onNodeLinkDisposedObservers;
    private _isCollapsed;
    private _frameInPorts;
    private _frameOutPorts;
    private _controlledPorts;
    private _exposedInPorts;
    private _exposedOutPorts;
    private _id;
    private _comments;
    private _frameIsResizing;
    private _resizingDirection;
    private _minFrameHeight;
    private _minFrameWidth;
    private _mouseXLimit;
    onExpandStateChanged: Observable<GraphFrame>;
    private readonly _closeSVG;
    private readonly _expandSVG;
    private readonly _collapseSVG;
    get id(): number;
    get isCollapsed(): boolean;
    private _createInputPort;
    private _markFramePortPositions;
    private _createFramePorts;
    private _removePortFromExposedWithNode;
    private _removePortFromExposedWithLink;
    private _createInputPorts;
    private _createOutputPorts;
    redrawFramePorts(): void;
    set isCollapsed(value: boolean);
    get nodes(): GraphNode[];
    get ports(): FrameNodePort[];
    get name(): string;
    set name(value: string);
    get color(): Color3;
    set color(value: Color3);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get width(): number;
    set width(value: number);
    get height(): number;
    set height(value: number);
    get comments(): string;
    set comments(comments: string);
    constructor(candidate: Nullable<HTMLDivElement>, canvas: GraphCanvasComponent, doNotCaptureNodes?: boolean);
    refresh(): void;
    addNode(node: GraphNode): void;
    removeNode(node: GraphNode): void;
    syncNode(node: GraphNode): void;
    cleanAccumulation(): void;
    private _onDown;
    move(newX: number, newY: number, align?: boolean): void;
    private _onUp;
    _moveFrame(offsetX: number, offsetY: number): void;
    private _onMove;
    moveFramePortUp(nodePort: FrameNodePort): void;
    private _movePortUp;
    moveFramePortDown(nodePort: FrameNodePort): void;
    private _movePortDown;
    private _initResizing;
    private _cleanUpResizing;
    private _updateMinHeightWithComments;
    private _isResizingTop;
    private _isResizingRight;
    private _isResizingBottom;
    private _isResizingLeft;
    private _onRightHandlePointerDown;
    private _onRightHandlePointerMove;
    private _moveRightHandle;
    private _onRightHandlePointerUp;
    private _onBottomHandlePointerDown;
    private _onBottomHandlePointerMove;
    private _moveBottomHandle;
    private _onBottomHandlePointerUp;
    private _onLeftHandlePointerDown;
    private _onLeftHandlePointerMove;
    private _moveLeftHandle;
    private _onLeftHandlePointerUp;
    private _onTopHandlePointerDown;
    private _onTopHandlePointerMove;
    private _moveTopHandle;
    private _onTopHandlePointerUp;
    private _onTopRightHandlePointerDown;
    private _onTopRightHandlePointerMove;
    private _moveTopRightHandle;
    private _onTopRightHandlePointerUp;
    private _onBottomRightHandlePointerDown;
    private _onBottomRightHandlePointerMove;
    private _moveBottomRightHandle;
    private _onBottomRightHandlePointerUp;
    private _onBottomLeftHandlePointerDown;
    private _onBottomLeftHandlePointerMove;
    private _moveBottomLeftHandle;
    private _onBottomLeftHandlePointerUp;
    private _onTopLeftHandlePointerDown;
    private _onTopLeftHandlePointerMove;
    private _moveTopLeftHandle;
    private _onTopLeftHandlePointerUp;
    private _expandLeft;
    private _expandTop;
    private _expandRight;
    private _expandBottom;
    dispose(): void;
    private _serializePortData;
    serialize(saveCollapsedState: boolean): IFrameData;
    export(): void;
    adjustPorts(): void;
    static Parse(serializationData: IFrameData, canvas: GraphCanvasComponent, map?: {
        [key: number]: number;
    }): GraphFrame;
}

}
declare module "babylonjs-gui-editor/nodeGraphSystem/graphNode" {
/// <reference types="react" />
import { Nullable } from "babylonjs/types";
import { GraphCanvasComponent } from "babylonjs-gui-editor/nodeGraphSystem/graphCanvas";
import { NodePort } from "babylonjs-gui-editor/nodeGraphSystem/nodePort";
import { GraphFrame } from "babylonjs-gui-editor/nodeGraphSystem/graphFrame";
import { NodeLink } from "babylonjs-gui-editor/nodeGraphSystem/nodeLink";
import { StateManager } from "babylonjs-gui-editor/nodeGraphSystem/stateManager";
import { INodeData } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/nodeData";
import { IPortData } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/portData";
export class GraphNode {
    content: INodeData;
    private _visual;
    private _headerContainer;
    private _headerIcon;
    private _headerIconImg;
    private _header;
    private _connections;
    private _inputsContainer;
    private _outputsContainer;
    private _content;
    private _comments;
    private _executionTime;
    private _selectionBorder;
    private _inputPorts;
    private _outputPorts;
    private _links;
    private _x;
    private _y;
    private _gridAlignedX;
    private _gridAlignedY;
    private _mouseStartPointX;
    private _mouseStartPointY;
    private _stateManager;
    private _onSelectionChangedObserver;
    private _onSelectionBoxMovedObserver;
    private _onFrameCreatedObserver;
    private _onUpdateRequiredObserver;
    private _onHighlightNodeObserver;
    private _ownerCanvas;
    private _isSelected;
    private _displayManager;
    private _isVisible;
    private _enclosingFrameId;
    addClassToVisual(className: string): void;
    removeClassFromVisual(className: string): void;
    get isVisible(): boolean;
    set isVisible(value: boolean);
    private _upateNodePortNames;
    get outputPorts(): NodePort[];
    get inputPorts(): NodePort[];
    get links(): NodeLink[];
    get gridAlignedX(): number;
    get gridAlignedY(): number;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get width(): number;
    get height(): number;
    get id(): number;
    get name(): string;
    get isSelected(): boolean;
    get enclosingFrameId(): number;
    set enclosingFrameId(value: number);
    set isSelected(value: boolean);
    setIsSelected(value: boolean, marqueeSelection: boolean): void;
    constructor(content: INodeData, stateManager: StateManager);
    isOverlappingFrame(frame: GraphFrame): boolean;
    getPortForPortData(portData: IPortData): NodePort | null;
    getPortDataForPortDataContent(data: any): IPortData | null;
    getLinksForPortDataContent(data: any): NodeLink[];
    getLinksForPortData(portData: IPortData): NodeLink[];
    private _refreshFrames;
    _refreshLinks(): void;
    refresh(): void;
    private _onDown;
    cleanAccumulation(useCeil?: boolean): void;
    private _onUp;
    private _onMove;
    renderProperties(): Nullable<JSX.Element>;
    appendVisual(root: HTMLDivElement, owner: GraphCanvasComponent): void;
    dispose(): void;
}

}
declare module "babylonjs-gui-editor/nodeGraphSystem/interfaces/displayManager" {
import { Nullable } from "babylonjs/types";
import { StateManager } from "babylonjs-gui-editor/nodeGraphSystem/stateManager";
import { INodeData } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/nodeData";
import { IPortData } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/portData";
export interface VisualContentDescription {
    [key: string]: HTMLElement;
}
export interface IDisplayManager {
    getHeaderClass(data: INodeData): string;
    shouldDisplayPortLabels(data: IPortData): boolean;
    updatePreviewContent(data: INodeData, contentArea: HTMLDivElement): void;
    updateFullVisualContent?(data: INodeData, visualContent: VisualContentDescription): void;
    getBackgroundColor(data: INodeData): string;
    getHeaderText(data: INodeData): string;
    onSelectionChanged?(data: INodeData, selectedData: Nullable<INodeData>, manager: StateManager): void;
    onDispose?(nodeData: INodeData, manager: StateManager): void;
}

}
declare module "babylonjs-gui-editor/nodeGraphSystem/interfaces/nodeContainer" {
import { GraphNode } from "babylonjs-gui-editor/nodeGraphSystem/graphNode";
import { INodeData } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/nodeData";
export interface INodeContainer {
    nodes: GraphNode[];
    appendNode(data: INodeData): GraphNode;
}

}
declare module "babylonjs-gui-editor/nodeGraphSystem/interfaces/nodeData" {
import { Nullable } from "babylonjs/types";
import { IPortData } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/portData";
export interface INodeData {
    data: any;
    name: string;
    uniqueId: number;
    isInput: boolean;
    comments: string;
    executionTime?: number;
    refreshCallback?: () => void;
    prepareHeaderIcon: (iconDiv: HTMLDivElement, img: HTMLImageElement) => void;
    getClassName: () => string;
    dispose: () => void;
    getPortByName: (name: string) => Nullable<IPortData>;
    inputs: IPortData[];
    outputs: IPortData[];
    invisibleEndpoints?: Nullable<any[]>;
    isConnectedToOutput?: () => boolean;
}

}
declare module "babylonjs-gui-editor/nodeGraphSystem/interfaces/nodeLocationInfo" {
export interface INodeLocationInfo {
    blockId: number;
    x: number;
    y: number;
}
export interface IFrameData {
    x: number;
    y: number;
    width: number;
    height: number;
    color: number[];
    name: string;
    isCollapsed: boolean;
    blocks: number[];
    comments: string;
}
export interface IEditorData {
    locations: INodeLocationInfo[];
    x: number;
    y: number;
    zoom: number;
    frames?: IFrameData[];
    map?: {
        [key: number]: number;
    };
}

}
declare module "babylonjs-gui-editor/nodeGraphSystem/interfaces/portData" {
import { Nullable } from "babylonjs/types";
import { GraphNode } from "babylonjs-gui-editor/nodeGraphSystem/graphNode";
export enum PortDataDirection {
    /** Input */
    Input = 0,
    /** Output */
    Output = 1
}
export interface IPortData {
    data: any;
    name: string;
    internalName: string;
    isExposedOnFrame: boolean;
    exposedPortPosition: number;
    isConnected: boolean;
    direction: PortDataDirection;
    ownerData: any;
    connectedPort: Nullable<IPortData>;
    needDualDirectionValidation: boolean;
    hasEndpoints: boolean;
    endpoints: Nullable<IPortData[]>;
    updateDisplayName: (newName: string) => void;
    canConnectTo: (port: IPortData) => boolean;
    connectTo: (port: IPortData) => void;
    disconnectFrom: (port: IPortData) => void;
    checkCompatibilityState(port: IPortData): number;
    getCompatibilityIssueMessage(issue: number, targetNode: GraphNode, targetPort: IPortData): string;
}

}
declare module "babylonjs-gui-editor/nodeGraphSystem/interfaces/propertyComponentProps" {
import { StateManager } from "babylonjs-gui-editor/nodeGraphSystem/stateManager";
import { INodeData } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/nodeData";
export interface IPropertyComponentProps {
    stateManager: StateManager;
    nodeData: INodeData;
}

}
declare module "babylonjs-gui-editor/nodeGraphSystem/interfaces/selectionChangedOptions" {
import { Nullable } from "babylonjs/types";
import { GraphFrame } from "babylonjs-gui-editor/nodeGraphSystem/graphFrame";
import { GraphNode } from "babylonjs-gui-editor/nodeGraphSystem/graphNode";
import { NodeLink } from "babylonjs-gui-editor/nodeGraphSystem/nodeLink";
import { NodePort } from "babylonjs-gui-editor/nodeGraphSystem/nodePort";
import { FramePortData } from "babylonjs-gui-editor/nodeGraphSystem/types/framePortData";
export interface ISelectionChangedOptions {
    selection: Nullable<GraphNode | NodeLink | GraphFrame | NodePort | FramePortData>;
    forceKeepSelection?: boolean;
    marqueeSelection?: boolean;
}

}
declare module "babylonjs-gui-editor/nodeGraphSystem/nodeLedger" {
export class NodeLedger {
    static RegisteredNodeNames: string[];
    static NameFormatter: (name: string) => string;
}

}
declare module "babylonjs-gui-editor/nodeGraphSystem/nodeLink" {
import { Observable } from "babylonjs/Misc/observable";
import { FrameNodePort } from "babylonjs-gui-editor/nodeGraphSystem/frameNodePort";
import { NodePort } from "babylonjs-gui-editor/nodeGraphSystem/nodePort";
import { GraphNode } from "babylonjs-gui-editor/nodeGraphSystem/graphNode";
import { GraphCanvasComponent } from "babylonjs-gui-editor/nodeGraphSystem/graphCanvas";
export class NodeLink {
    private _graphCanvas;
    private _portA;
    private _portB?;
    private _nodeA;
    private _nodeB?;
    private _path;
    private _selectionPath;
    private _onSelectionChangedObserver;
    private _isVisible;
    private _isTargetCandidate;
    onDisposedObservable: Observable<NodeLink>;
    get isTargetCandidate(): boolean;
    set isTargetCandidate(value: boolean);
    get isVisible(): boolean;
    set isVisible(value: boolean);
    get portA(): FrameNodePort | NodePort;
    get portB(): FrameNodePort | NodePort | undefined;
    get nodeA(): GraphNode;
    get nodeB(): GraphNode | undefined;
    intersectsWith(rect: DOMRect): boolean;
    update(endX?: number, endY?: number, straight?: boolean): void;
    constructor(graphCanvas: GraphCanvasComponent, portA: NodePort, nodeA: GraphNode, portB?: NodePort, nodeB?: GraphNode);
    onClick(evt: MouseEvent): void;
    dispose(notify?: boolean): void;
}

}
declare module "babylonjs-gui-editor/nodeGraphSystem/nodePort" {
import { Nullable } from "babylonjs/types";
import { Observer } from "babylonjs/Misc/observable";
import { Vector2 } from "babylonjs/Maths/math.vector";
import { GraphNode } from "babylonjs-gui-editor/nodeGraphSystem/graphNode";
import { StateManager } from "babylonjs-gui-editor/nodeGraphSystem/stateManager";
import { ISelectionChangedOptions } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/selectionChangedOptions";
import { FrameNodePort } from "babylonjs-gui-editor/nodeGraphSystem/frameNodePort";
import { IDisplayManager } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/displayManager";
import { IPortData } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/portData";
export class NodePort {
    portData: IPortData;
    node: GraphNode;
    protected _element: HTMLDivElement;
    protected _img: HTMLImageElement;
    protected _pip: HTMLDivElement;
    protected _stateManager: StateManager;
    protected _portLabelElement: Element;
    protected _onCandidateLinkMovedObserver: Nullable<Observer<Nullable<Vector2>>>;
    protected _onSelectionChangedObserver: Nullable<Observer<Nullable<ISelectionChangedOptions>>>;
    protected _exposedOnFrame: boolean;
    delegatedPort: Nullable<FrameNodePort>;
    get element(): HTMLDivElement;
    get portName(): string;
    set portName(newName: string);
    get disabled(): boolean;
    hasLabel(): boolean;
    get exposedOnFrame(): boolean;
    set exposedOnFrame(value: boolean);
    get exposedPortPosition(): number;
    set exposedPortPosition(value: number);
    private _isConnectedToNodeOutsideOfFrame;
    refresh(): void;
    constructor(portContainer: HTMLElement, portData: IPortData, node: GraphNode, stateManager: StateManager);
    dispose(): void;
    static CreatePortElement(portData: IPortData, node: GraphNode, root: HTMLElement, displayManager: Nullable<IDisplayManager>, stateManager: StateManager): NodePort;
}

}
declare module "babylonjs-gui-editor/nodeGraphSystem/propertyLedger" {
import { ComponentClass } from "react";
import { IPropertyComponentProps } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/propertyComponentProps";
export class PropertyLedger {
    static DefaultControl: ComponentClass<IPropertyComponentProps>;
    static RegisteredControls: {
        [key: string]: ComponentClass<IPropertyComponentProps>;
    };
}

}
declare module "babylonjs-gui-editor/nodeGraphSystem/searchBox" {
import * as React from "react";
import { StateManager } from "babylonjs-gui-editor/nodeGraphSystem/stateManager";
import "babylonjs-gui-editor/nodeGraphSystem/searchBox.scss";
export interface ISearchBoxComponentProps {
    stateManager: StateManager;
}
/**
 * The search box component.
 */
export class SearchBoxComponent extends React.Component<ISearchBoxComponentProps, {
    isVisible: boolean;
    filter: string;
    selectedIndex: number;
}> {
    private _handleEscKey;
    private _targetX;
    private _targetY;
    private _nodes;
    constructor(props: ISearchBoxComponentProps);
    hide(): void;
    onFilterChange(evt: React.ChangeEvent<HTMLInputElement>): void;
    onNewNodeRequested(name: string): void;
    onKeyDown(evt: React.KeyboardEvent): void;

}

}
declare module "babylonjs-gui-editor/nodeGraphSystem/stateManager" {
import { Vector2 } from "babylonjs/Maths/math.vector";
import { Observable } from "babylonjs/Misc/observable";
import { Nullable } from "babylonjs/types";
import { FrameNodePort } from "babylonjs-gui-editor/nodeGraphSystem/frameNodePort";
import { GraphFrame } from "babylonjs-gui-editor/nodeGraphSystem/graphFrame";
import { GraphNode } from "babylonjs-gui-editor/nodeGraphSystem/graphNode";
import { INodeContainer } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/nodeContainer";
import { INodeData } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/nodeData";
import { IPortData } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/portData";
import { ISelectionChangedOptions } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/selectionChangedOptions";
import { NodePort } from "babylonjs-gui-editor/nodeGraphSystem/nodePort";
export class StateManager {
    data: any;
    hostDocument: Document;
    lockObject: any;
    modalIsDisplayed: boolean;
    onSearchBoxRequiredObservable: Observable<{
        x: number;
        y: number;
    }>;
    onSelectionChangedObservable: Observable<Nullable<ISelectionChangedOptions>>;
    onFrameCreatedObservable: Observable<GraphFrame>;
    onUpdateRequiredObservable: Observable<any>;
    onGraphNodeRemovalObservable: Observable<GraphNode>;
    onSelectionBoxMoved: Observable<DOMRect | ClientRect>;
    onCandidateLinkMoved: Observable<Nullable<Vector2>>;
    onCandidatePortSelectedObservable: Observable<Nullable<FrameNodePort | NodePort>>;
    onNewNodeCreatedObservable: Observable<GraphNode>;
    onRebuildRequiredObservable: Observable<void>;
    onErrorMessageDialogRequiredObservable: Observable<string>;
    onExposePortOnFrameObservable: Observable<GraphNode>;
    onGridSizeChanged: Observable<void>;
    onNewBlockRequiredObservable: Observable<{
        type: string;
        targetX: number;
        targetY: number;
        needRepositioning?: boolean | undefined;
        smartAdd?: boolean | undefined;
    }>;
    onHighlightNodeObservable: Observable<{
        data: any;
        active: boolean;
    }>;
    exportData: (data: any, frame?: Nullable<GraphFrame>) => string;
    isElbowConnectionAllowed: (nodeA: FrameNodePort | NodePort, nodeB: FrameNodePort | NodePort) => boolean;
    isDebugConnectionAllowed: (nodeA: FrameNodePort | NodePort, nodeB: FrameNodePort | NodePort) => boolean;
    applyNodePortDesign: (data: IPortData, element: HTMLElement, img: HTMLImageElement, pip: HTMLDivElement) => void;
    storeEditorData: (serializationObject: any, frame?: Nullable<GraphFrame>) => void;
    getEditorDataMap: () => {
        [key: number]: number;
    };
    createDefaultInputData: (rootData: any, portData: IPortData, nodeContainer: INodeContainer) => Nullable<{
        data: INodeData;
        name: string;
    }>;
}

}
declare module "babylonjs-gui-editor/nodeGraphSystem/tools" {
import { GraphCanvasComponent } from "babylonjs-gui-editor/nodeGraphSystem/graphCanvas";
import { GraphNode } from "babylonjs-gui-editor/nodeGraphSystem/graphNode";
import { NodeLink } from "babylonjs-gui-editor/nodeGraphSystem/nodeLink";
import { FramePortData } from "babylonjs-gui-editor/nodeGraphSystem/types/framePortData";
export const IsFramePortData: (variableToCheck: any) => variableToCheck is FramePortData;
export const RefreshNode: (node: GraphNode, visitedNodes?: Set<GraphNode>, visitedLinks?: Set<NodeLink>, canvas?: GraphCanvasComponent) => void;

}
declare module "babylonjs-gui-editor/nodeGraphSystem/typeLedger" {
import { INodeContainer } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/nodeContainer";
import { INodeData } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/nodeData";
import { IPortData } from "babylonjs-gui-editor/nodeGraphSystem/interfaces/portData";
import { NodePort } from "babylonjs-gui-editor/nodeGraphSystem/nodePort";
export class TypeLedger {
    static PortDataBuilder: (port: NodePort, nodeContainer: INodeContainer) => IPortData;
    static NodeDataBuilder: (data: any, nodeContainer: INodeContainer) => INodeData;
}

}
declare module "babylonjs-gui-editor/nodeGraphSystem/types/framePortData" {
import { GraphFrame } from "babylonjs-gui-editor/nodeGraphSystem/graphFrame";
import { FrameNodePort } from "babylonjs-gui-editor/nodeGraphSystem/frameNodePort";
export type FramePortData = {
    frame: GraphFrame;
    port: FrameNodePort;
};

}
declare module "babylonjs-gui-editor/propertyChangedEvent" {
export class PropertyChangedEvent {
    object: any;
    property: string;
    value: any;
    initialValue: any;
    allowNullValue?: boolean;
}

}
declare module "babylonjs-gui-editor/stringTools" {
export class StringTools {
    private static _SaveAs;
    private static _Click;
    /**
     * Download a string into a file that will be saved locally by the browser
     * @param document
     * @param content defines the string to download locally as a file
     * @param filename
     */
    static DownloadAsFile(document: HTMLDocument, content: string, filename: string): void;
}

}
declare module "babylonjs-gui-editor/tabs/propertyGrids/gui/checkboxPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { Checkbox } from "babylonjs-gui/2D/controls/checkbox";
interface ICheckboxPropertyGridComponentProps {
    checkbox: Checkbox;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class CheckboxPropertyGridComponent extends React.Component<ICheckboxPropertyGridComponentProps> {
    constructor(props: ICheckboxPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/tabs/propertyGrids/gui/colorPickerPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { ColorPicker } from "babylonjs-gui/2D/controls/colorpicker";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
interface IColorPickerPropertyGridComponentProps {
    colorPicker: ColorPicker;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class ColorPickerPropertyGridComponent extends React.Component<IColorPickerPropertyGridComponentProps> {
    constructor(props: IColorPickerPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/tabs/propertyGrids/gui/commonControlPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { Control } from "babylonjs-gui/2D/controls/control";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
interface ICommonControlPropertyGridComponentProps {
    controls?: Control[];
    control?: Control;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class CommonControlPropertyGridComponent extends React.Component<ICommonControlPropertyGridComponentProps> {
    constructor(props: ICommonControlPropertyGridComponentProps);


}
export {};

}
declare module "babylonjs-gui-editor/tabs/propertyGrids/gui/controlPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { Control } from "babylonjs-gui/2D/controls/control";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
interface IControlPropertyGridComponentProps {
    control: Control;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class ControlPropertyGridComponent extends React.Component<IControlPropertyGridComponentProps> {
    constructor(props: IControlPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/tabs/propertyGrids/gui/ellipsePropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { Ellipse } from "babylonjs-gui/2D/controls/ellipse";
interface IEllipsePropertyGridComponentProps {
    ellipse: Ellipse;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class EllipsePropertyGridComponent extends React.Component<IEllipsePropertyGridComponentProps> {
    constructor(props: IEllipsePropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/tabs/propertyGrids/gui/gridPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { Grid } from "babylonjs-gui/2D/controls/grid";
interface IGridPropertyGridComponentProps {
    grid: Grid;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class GridPropertyGridComponent extends React.Component<IGridPropertyGridComponentProps> {
    constructor(props: IGridPropertyGridComponentProps);



}
export {};

}
declare module "babylonjs-gui-editor/tabs/propertyGrids/gui/imageBasedSliderPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { ImageBasedSlider } from "babylonjs-gui/2D/controls/sliders/imageBasedSlider";
interface IImageBasedSliderPropertyGridComponentProps {
    imageBasedSlider: ImageBasedSlider;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class ImageBasedSliderPropertyGridComponent extends React.Component<IImageBasedSliderPropertyGridComponentProps> {
    constructor(props: IImageBasedSliderPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/tabs/propertyGrids/gui/imagePropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { Image } from "babylonjs-gui/2D/controls/image";
interface IImagePropertyGridComponentProps {
    image: Image;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class ImagePropertyGridComponent extends React.Component<IImagePropertyGridComponentProps> {
    constructor(props: IImagePropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/tabs/propertyGrids/gui/inputTextPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { InputText } from "babylonjs-gui/2D/controls/inputText";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
interface IInputTextPropertyGridComponentProps {
    inputText: InputText;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class InputTextPropertyGridComponent extends React.Component<IInputTextPropertyGridComponentProps> {
    constructor(props: IInputTextPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/tabs/propertyGrids/gui/linePropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { Line } from "babylonjs-gui/2D/controls/line";
interface ILinePropertyGridComponentProps {
    line: Line;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class LinePropertyGridComponent extends React.Component<ILinePropertyGridComponentProps> {
    constructor(props: ILinePropertyGridComponentProps);
    onDashChange(value: string): void;

}
export {};

}
declare module "babylonjs-gui-editor/tabs/propertyGrids/gui/radioButtonPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { RadioButton } from "babylonjs-gui/2D/controls/radioButton";
interface IRadioButtonPropertyGridComponentProps {
    radioButtons: RadioButton[];
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class RadioButtonPropertyGridComponent extends React.Component<IRadioButtonPropertyGridComponentProps> {
    constructor(props: IRadioButtonPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/tabs/propertyGrids/gui/rectanglePropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { Rectangle } from "babylonjs-gui/2D/controls/rectangle";
interface IRectanglePropertyGridComponentProps {
    rectangle: Rectangle;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class RectanglePropertyGridComponent extends React.Component<IRectanglePropertyGridComponentProps> {
    constructor(props: IRectanglePropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/tabs/propertyGrids/gui/scrollViewerPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { ScrollViewer } from "babylonjs-gui/2D/controls/scrollViewers/scrollViewer";
interface IScrollViewerPropertyGridComponentProps {
    scrollViewer: ScrollViewer;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class ScrollViewerPropertyGridComponent extends React.Component<IScrollViewerPropertyGridComponentProps> {
    constructor(props: IScrollViewerPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/tabs/propertyGrids/gui/sliderPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { Slider } from "babylonjs-gui/2D/controls/sliders/slider";
interface ISliderPropertyGridComponentProps {
    slider: Slider;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class SliderPropertyGridComponent extends React.Component<ISliderPropertyGridComponentProps> {
    constructor(props: ISliderPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/tabs/propertyGrids/gui/stackPanelPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
import { StackPanel } from "babylonjs-gui/2D/controls/stackPanel";
interface IStackPanelPropertyGridComponentProps {
    stackPanel: StackPanel;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class StackPanelPropertyGridComponent extends React.Component<IStackPanelPropertyGridComponentProps> {
    constructor(props: IStackPanelPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/tabs/propertyGrids/gui/textBlockPropertyGridComponent" {
import * as React from "react";
import { Observable } from "babylonjs/Misc/observable";
import { PropertyChangedEvent } from "babylonjs-gui-editor/propertyChangedEvent";
import { TextBlock } from "babylonjs-gui/2D/controls/textBlock";
import { LockObject } from "babylonjs-gui-editor/tabs/propertyGrids/lockObject";
interface ITextBlockPropertyGridComponentProps {
    textBlock: TextBlock;
    lockObject: LockObject;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}
export class TextBlockPropertyGridComponent extends React.Component<ITextBlockPropertyGridComponentProps> {
    constructor(props: ITextBlockPropertyGridComponentProps);

}
export {};

}
declare module "babylonjs-gui-editor/tabs/propertyGrids/lockObject" {
/**
 * Class used to provide lock mechanism
 */
export class LockObject {
    /**
     * Gets or set if the lock is engaged
     */
    lock: boolean;
}

}

declare module "babylonjs-gui-editor" {
    export * from "babylonjs-gui-editor/legacy/legacy";
}


declare module BABYLON {
    interface ICommandBarComponentProps {
        globalState: GlobalState;
    }
    export class CommandBarComponent extends React.Component<ICommandBarComponentProps> {
        private _sizeOption;
        private _stopUpdating;
        private _lockObject;
        constructor(props: ICommandBarComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ICommandButtonComponentProps {
        tooltip: string;
        shortcut?: string;
        icon: string;
        iconLabel?: string;
        isActive: boolean;
        copyDeleteDisabled?: boolean;
        pasteDisabled?: boolean;
        onClick: () => void;
        altStyle?: boolean;
        disabled?: boolean;
    }
    export class CommandButtonComponent extends React.Component<ICommandButtonComponentProps> {
        constructor(props: ICommandButtonComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ICommandDropdownComponentProps {
        globalState: GlobalState;
        icon?: string;
        tooltip: string;
        defaultValue?: string;
        items: {
            label: string;
            icon?: string;
            fileButton?: boolean;
            loadControlButton?: boolean;
            onClick?: () => void;
            onCheck?: (value: boolean) => void;
            storeKey?: string;
            isActive?: boolean;
            defaultValue?: boolean | string;
            subItems?: string[];
        }[];
        toRight?: boolean;
    }
    export class CommandDropdownComponent extends React.Component<ICommandDropdownComponentProps, {
        isExpanded: boolean;
        activeState: string;
    }> {
        constructor(props: ICommandDropdownComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IGuiListComponentProps {
        globalState: GlobalState;
    }
    export class GuiListComponent extends React.Component<IGuiListComponentProps, {
        filter: string;
    }> {
        private _onResetRequiredObserver;
        private static _Tooltips;
        constructor(props: IGuiListComponentProps);
        componentWillUnmount(): void;
        filterContent(filter: string): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ILogComponentProps {
        globalState: GlobalState;
    }
    export class LogEntry {
        message: string;
        isError: boolean;
        constructor(message: string, isError: boolean);
    }
    export class LogComponent extends React.Component<ILogComponentProps, {
        logs: LogEntry[];
    }> {
        constructor(props: ILogComponentProps);
        componentDidMount(): void;
        componentDidUpdate(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IParentingPropertyGridComponentProps {
        control: BABYLON.GUI.Control;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ParentingPropertyGridComponent extends React.Component<IParentingPropertyGridComponentProps> {
        constructor(props: IParentingPropertyGridComponentProps);
        private _columnNumber;
        private _rowNumber;
        updateGridPosition(): void;
        getCellInfo(): void;
        private _changeCell;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IButtonPropertyGridComponentProps {
        rectangles: BABYLON.GUI.Rectangle[];
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        onAddComponent: (newComponent: string) => void;
        onFontsParsedObservable?: Observable<void>;
        globalState?: GlobalState;
    }
    export class ButtonPropertyGridComponent extends React.Component<IButtonPropertyGridComponentProps> {
        constructor(props: IButtonPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ICheckboxPropertyGridComponentProps {
        checkboxes: BABYLON.GUI.Checkbox[];
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        onFontsParsedObservable?: Observable<void>;
        globalState?: GlobalState;
    }
    export class CheckboxPropertyGridComponent extends React.Component<ICheckboxPropertyGridComponentProps> {
        constructor(props: ICheckboxPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IColorPickerPropertyGridComponentProps {
        colorPickers: BABYLON.GUI.ColorPicker[];
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        onFontsParsedObservable?: Observable<void>;
        globalState?: GlobalState;
    }
    export class ColorPickerPropertyGridComponent extends React.Component<IColorPickerPropertyGridComponentProps> {
        constructor(props: IColorPickerPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ICommonControlPropertyGridComponentProps {
        controls: BABYLON.GUI.Control[];
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        hideDimensions?: boolean;
        onFontsParsedObservable?: Observable<void>;
        globalState?: GlobalState;
    }
    interface ICommonControlPropertyGridComponentState {
        fontFamilyOptions: IInspectableOptions[];
    }
    export class CommonControlPropertyGridComponent extends React.Component<ICommonControlPropertyGridComponentProps, ICommonControlPropertyGridComponentState> {
        private _onPropertyChangedObserver;
        private _onFontsParsedObserver;
        private _onControlVisibilityChangedObservers;
        constructor(props: ICommonControlPropertyGridComponentProps);
        componentWillMount(): void;
        private _checkFontsInLayout;
        private _addFont;
        private _getTransformedReferenceCoordinate;
        private _updateAlignment;
        private _checkAndUpdateValues;
        private _addOrUpdateMetadata;
        private _removeFromMetadata;
        private _getCommonPropertyKeys;
        private _markChildrenAsDirty;
        componentWillUnmount(): void;
        _filterFontDuplicates(array: {
            label: string;
            value: string;
            id: string;
        }[]): {
            label: string;
            value: string;
            id: string;
        }[];
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IContainerPropertyGridComponentProps {
        containers: BABYLON.GUI.Container[];
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ContainerPropertyGridComponent extends React.Component<IContainerPropertyGridComponentProps> {
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IControlPropertyGridComponentProps {
        controls: BABYLON.GUI.Control[];
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        onFontsParsedObservable?: Observable<void>;
        globalState?: GlobalState;
    }
    export class ControlPropertyGridComponent extends React.Component<IControlPropertyGridComponentProps> {
        constructor(props: IControlPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IDisplayGridPropertyGridComponentProps {
        displayGrids: BABYLON.GUI.DisplayGrid[];
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        onFontsParsedObservable?: Observable<void>;
        globalState?: GlobalState;
    }
    export class DisplayGridPropertyGridComponent extends React.Component<IDisplayGridPropertyGridComponentProps> {
        constructor(props: IDisplayGridPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IEllipsePropertyGridComponentProps {
        ellipses: BABYLON.GUI.Ellipse[];
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        onFontsParsedObservable?: Observable<void>;
        globalState?: GlobalState;
    }
    export class EllipsePropertyGridComponent extends React.Component<IEllipsePropertyGridComponentProps> {
        constructor(props: IEllipsePropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IGridPropertyGridComponentProps {
        grids: BABYLON.GUI.Grid[];
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        onFontsParsedObservable?: Observable<void>;
        globalState?: GlobalState;
        onUpdateRequiredObservable?: Observable<void>;
    }
    interface IGridPropertyComponentState {
        removingColumn: boolean;
        removingRow: boolean;
    }
    export class GridPropertyGridComponent extends React.Component<IGridPropertyGridComponentProps, IGridPropertyComponentState> {
        constructor(props: IGridPropertyGridComponentProps);
        private _previousGrid;
        private _rowDefinitions;
        private _rowEditFlags;
        private _columnEditFlags;
        private _columnDefinitions;
        private _editedRow;
        private _editedColumn;
        private _rowChild;
        private _columnChild;
        renderRows(): import("react/jsx-runtime").JSX.Element[];
        setRowValues(): void;
        setColumnValues(): void;
        renderColumns(): import("react/jsx-runtime").JSX.Element[];
        parsePercentage(value: string): number;
        isCloseTo(value: number, expected: number, epsilon?: number): boolean;
        adjustPercentages(definitions: string[], editFlags: boolean[]): string[];
        resizeRow(): void;
        resizeColumn(): void;
        checkValue(value: string, percent: boolean): string;
        checkPercentage(value: string): boolean;
        resetValues(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IImageBasedSliderPropertyGridComponentProps {
        imageBasedSliders: BABYLON.GUI.ImageBasedSlider[];
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        onFontsParsedObservable?: Observable<void>;
        globalState?: GlobalState;
    }
    export class ImageBasedSliderPropertyGridComponent extends React.Component<IImageBasedSliderPropertyGridComponentProps> {
        constructor(props: IImageBasedSliderPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IImagePropertyGridComponentProps {
        images: BABYLON.GUI.Image[];
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        onFontsParsedObservable?: Observable<void>;
        globalState?: GlobalState;
    }
    export class ImagePropertyGridComponent extends React.Component<IImagePropertyGridComponentProps> {
        private _observers;
        constructor(props: IImagePropertyGridComponentProps);
        shouldComponentUpdate(nextProps: IImagePropertyGridComponentProps): boolean;
        updateObservers(oldImages: BABYLON.GUI.Image[], newImages: BABYLON.GUI.Image[]): void;
        componentWillUnmount(): void;
        toggleAnimations(on: boolean): void;
        getMaxCells(): number;
        updateCellSize(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IInputTextPropertyGridComponentProps {
        inputTexts: BABYLON.GUI.InputText[];
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        onFontsParsedObservable?: Observable<void>;
        globalState?: GlobalState;
    }
    export class InputTextPropertyGridComponent extends React.Component<IInputTextPropertyGridComponentProps> {
        constructor(props: IInputTextPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ILinePropertyGridComponentProps {
        lines: BABYLON.GUI.Line[];
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        onFontsParsedObservable?: Observable<void>;
        globalState?: GlobalState;
    }
    export class LinePropertyGridComponent extends React.Component<ILinePropertyGridComponentProps> {
        constructor(props: ILinePropertyGridComponentProps);
        onDashChange(value: string): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IRadioButtonPropertyGridComponentProps {
        radioButtons: BABYLON.GUI.RadioButton[];
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        onFontsParsedObservable?: Observable<void>;
        globalState?: GlobalState;
    }
    export class RadioButtonPropertyGridComponent extends React.Component<IRadioButtonPropertyGridComponentProps> {
        constructor(props: IRadioButtonPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IRectanglePropertyGridComponentProps {
        rectangles: BABYLON.GUI.Rectangle[];
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        onFontsParsedObservable?: Observable<void>;
        globalState?: GlobalState;
    }
    export class RectanglePropertyGridComponent extends React.Component<IRectanglePropertyGridComponentProps> {
        constructor(props: IRectanglePropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IScrollViewerPropertyGridComponentProps {
        scrollViewers: BABYLON.GUI.ScrollViewer[];
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        onFontsParsedObservable?: Observable<void>;
        globalState?: GlobalState;
    }
    export class ScrollViewerPropertyGridComponent extends React.Component<IScrollViewerPropertyGridComponentProps> {
        constructor(props: IScrollViewerPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ISliderGenericPropertyGridComponentProps {
        sliders: BABYLON.GUI.Slider[];
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        onFontsParsedObservable?: Observable<void>;
        globalState?: GlobalState;
    }
    export class SliderGenericPropertyGridComponent extends React.Component<ISliderGenericPropertyGridComponentProps> {
        constructor(props: ISliderGenericPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ISliderPropertyGridComponentProps {
        sliders: (Slider | BABYLON.GUI.ImageBasedSlider)[];
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class SliderPropertyGridComponent extends React.Component<ISliderPropertyGridComponentProps> {
        constructor(props: ISliderPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IStackPanelPropertyGridComponentProps {
        stackPanels: BABYLON.GUI.StackPanel[];
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        onFontsParsedObservable?: Observable<void>;
        globalState?: GlobalState;
    }
    export class StackPanelPropertyGridComponent extends React.Component<IStackPanelPropertyGridComponentProps> {
        constructor(props: IStackPanelPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ITextBlockPropertyGridComponentProps {
        textBlocks: BABYLON.GUI.TextBlock[];
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        onFontsParsedObservable?: Observable<void>;
        globalState?: GlobalState;
    }
    export class TextBlockPropertyGridComponent extends React.Component<ITextBlockPropertyGridComponentProps> {
        constructor(props: ITextBlockPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IPropertyTabComponentProps {
        globalState: GlobalState;
    }
    export class PropertyTabComponent extends React.Component<IPropertyTabComponentProps> {
        private _onBuiltObserver;
        private _timerIntervalId;
        private _lockObject;
        constructor(props: IPropertyTabComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        load(file: File): void;
        /**
         * Read loaded file
         * @param file
         */
        loadControl(file: File): void;
        save(saveCallback: () => void): void;
        saveLocally: () => void;
        /**
         * Save the selected control as Json with file name of guiControl
         */
        saveSelectedControlLocally: () => void;
        saveToSnippetServerHelper: (content: string, adt: BABYLON.GUI.AdvancedDynamicTexture) => Promise<string>;
        saveToSnippetServer: () => Promise<void>;
        loadFromSnippet(): void;
        renderNode(nodes: BABYLON.GUI.Control[]): import("react/jsx-runtime").JSX.Element;
        /**
         * returns the class name of a list of controls if they share a class, or an empty string if not
         * @param nodes the list of controls to check
         * @returns the class name of a list of controls if they share a class, or an empty string if not
         */
        getControlsCommonClassName(nodes: BABYLON.GUI.Control[]): string;
        renderProperties(nodes: BABYLON.GUI.Control[]): import("react/jsx-runtime").JSX.Element | undefined;
        renderControlIcon(nodes: BABYLON.GUI.Control[]): string;
        render(): import("react/jsx-runtime").JSX.Element | null;
    }


    interface IControlTreeItemComponentProps {
        control: BABYLON.GUI.Control;
        extensibilityGroups?: IExplorerExtensibilityGroup[];
        onClick: () => void;
        globalState: GlobalState;
        isHovered: boolean;
        isDragOver: boolean;
        dragOverLocation: DragOverLocation;
        onRenamingStateChanged: (renaming: boolean) => void;
    }
    export class ControlTreeItemComponent extends React.Component<IControlTreeItemComponentProps, {
        isActive: boolean;
        isVisible: boolean;
        isRenaming: boolean;
    }> {
        private _onIsVisibleChangedObserver;
        constructor(props: IControlTreeItemComponentProps);
        componentWillUnmount(): void;
        highlight(): void;
        switchVisibility(): void;
        onRename(name: string): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IExtensionsComponentProps {
        target: any;
        extensibilityGroups?: IExplorerExtensibilityGroup[];
    }
    export class ExtensionsComponent extends React.Component<IExtensionsComponentProps, {
        popupVisible: boolean;
    }> {
        private _popup;
        private _extensionRef;
        constructor(props: IExtensionsComponentProps);
        showPopup(): void;
        componentDidMount(): void;
        componentDidUpdate(): void;
        render(): import("react/jsx-runtime").JSX.Element | null;
    }


    interface ISceneExplorerFilterComponentProps {
        onFilter: (filter: string) => void;
    }
    export class SceneExplorerFilterComponent extends React.Component<ISceneExplorerFilterComponentProps> {
        constructor(props: ISceneExplorerFilterComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }
    interface ISceneExplorerComponentProps {
        scene?: Scene;
        noCommands?: boolean;
        noHeader?: boolean;
        noExpand?: boolean;
        noClose?: boolean;
        extensibilityGroups?: IExplorerExtensibilityGroup[];
        globalState: GlobalState;
        popupMode?: boolean;
        onPopup?: () => void;
        onClose?: () => void;
    }
    export class SceneExplorerComponent extends React.Component<ISceneExplorerComponentProps, {
        filter: Nullable<string>;
        selectedEntity: any;
        scene: Nullable<Scene>;
    }> {
        private _onSelectionChangeObserver;
        private _onParrentingChangeObserver;
        private _onNewSceneObserver;
        private _onPropertyChangedObservable;
        private _onUpdateRequiredObserver;
        constructor(props: ISceneExplorerComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        filterContent(filter: string): void;
        findSiblings(parent: any, items: any[], target: any, goNext: boolean, data: {
            previousOne?: any;
            found?: boolean;
        }): boolean;
        processKeys(keyEvent: React.KeyboardEvent<HTMLDivElement>): void;
        renderContent(): import("react/jsx-runtime").JSX.Element | null;
        onClose(): void;
        onPopup(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export interface ITreeItemComponentProps {
        items?: Nullable<any[]>;
        label: string;
        offset: number;
        filter: Nullable<string>;
        forceSubitems?: boolean;
        globalState: GlobalState;
        entity?: any;
        selectedEntities: any[];
        extensibilityGroups?: IExplorerExtensibilityGroup[];
        contextMenuItems?: {
            label: string;
            action: () => void;
        }[];
    }
    export class TreeItemComponent extends React.Component<ITreeItemComponentProps, {
        isExpanded: boolean;
        mustExpand: boolean;
    }> {
        static _ContextMenuUniqueIdGenerator: number;
        constructor(props: ITreeItemComponentProps);
        switchExpandedState(): void;
        shouldComponentUpdate(nextProps: ITreeItemComponentProps, nextState: {
            isExpanded: boolean;
        }): boolean;
        expandAll(expand: boolean): void;
        renderContextMenu(): import("react/jsx-runtime").JSX.Element | null;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ITreeItemLabelComponentProps {
        label?: string;
        onClick?: () => void;
        onChange: (newValue: string) => void;
        bracket: string;
        renaming: boolean;
        setRenaming: (renaming: boolean) => void;
    }
    interface ITreeItemLabelState {
        value: string;
    }
    export class TreeItemLabelComponent extends React.Component<ITreeItemLabelComponentProps, ITreeItemLabelState> {
        constructor(props: ITreeItemLabelComponentProps);
        onClick(): void;
        onBlur(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export interface ITreeItemSelectableComponentProps {
        entity: any;
        selectedEntities: any[];
        mustExpand?: boolean;
        offset: number;
        globalState: GlobalState;
        extensibilityGroups?: IExplorerExtensibilityGroup[];
        filter: Nullable<string>;
    }
    export interface ITreeItemSelectableComponentState {
        expand: boolean;
        dragOver: boolean;
        isSelected: boolean;
        isHovered: boolean;
        dragOverLocation: DragOverLocation;
        blockDrag: boolean;
    }
    export class TreeItemSelectableComponent extends React.Component<ITreeItemSelectableComponentProps, ITreeItemSelectableComponentState> {
        private _onSelectionChangedObservable;
        private _onDraggingEndObservable;
        private _onDraggingStartObservable;
        /** flag flipped onDragEnter if dragOver is already true
         * prevents dragLeave from immediately setting dragOver to false
         * required to make dragging work as expected
         * see: see: https://github.com/transformation-dev/matrx/tree/master/packages/dragster
         */
        private _secondDragEnter;
        constructor(props: ITreeItemSelectableComponentProps);
        switchExpandedState(): void;
        shouldComponentUpdate(nextProps: ITreeItemSelectableComponentProps, nextState: {
            isSelected: boolean;
        }): boolean;
        scrollIntoView(): void;
        componentWillUnmount(): void;
        onSelect(): void;
        renderChildren(isExpanded: boolean, offset?: boolean): (import("react/jsx-runtime").JSX.Element | null)[] | null;
        render(): import("react/jsx-runtime").JSX.Element | (import("react/jsx-runtime").JSX.Element | null)[] | null;
        dragOver(event: React.DragEvent<HTMLDivElement>): void;
        updateDragOverLocation(event: React.DragEvent<HTMLDivElement>): void;
        drop(): void;
    }


    export var ControlTypes: {
        className: string;
        icon: string;
    }[];


    interface IArtBoardProps {
        globalState: GlobalState;
    }
    interface IArtBoardState {
        bounds: Rect;
    }
    export class ArtBoardComponent extends React.Component<IArtBoardProps, IArtBoardState> {
        constructor(props: IArtBoardProps);
        update(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export type DimensionProperties = "width" | "left" | "height" | "top" | "paddingLeft" | "paddingRight" | "paddingTop" | "paddingBottom" | "fontSize" | "linkOffsetX" | "linkOffsetY";
    export class Rect {
        top: number;
        left: number;
        right: number;
        bottom: number;
        constructor(left: number, top: number, right: number, bottom: number);
        clone(): Rect;
        get center(): Vector2;
        get width(): number;
        get height(): number;
    }
    export class CoordinateHelper {
        private static _MatrixCache;
        static GlobalState: GlobalState;
        /**
         * Get the scaling of a specific GUI control
         * @param node the node for which we are getting the scaling
         * @param relative should we return only the relative scaling (relative to the parent)
         * @returns an X,Y vector of the scaling
         */
        static GetScale(node: BABYLON.GUI.Control, relative?: boolean): Vector2;
        static GetRotation(node: BABYLON.GUI.Control, relative?: boolean): number;
        static GetParentSizes(guiControl: BABYLON.GUI.Control): BABYLON.GUI.Measure;
        /**
         * This function calculates a local matrix for a node, including it's full transformation and pivot point
         *
         * @param node the node to calculate the matrix for
         * @param storedValues should the stored (cached) values be used to calculate the matrix
         * @returns a new matrix for the control
         */
        static GetNodeMatrix(node: BABYLON.GUI.Control, storedValues?: Rect): BABYLON.GUI.Matrix2D;
        /**
         * Using the node's tree, calculate its world matrix and return it
         * @param node the node to calculate the matrix for
         * @param storedValues used stored valued (cached when pointer down is clicked)
         * @param stopAt stop looking when this node is found
         * @returns the world matrix for this node
         */
        static NodeToRTTWorldMatrix(node: BABYLON.GUI.Control, storedValues?: Rect, stopAt?: BABYLON.GUI.Control): BABYLON.GUI.Matrix2D;
        static NodeToRTTSpace(node: BABYLON.GUI.Control, x: number, y: number, reference?: Vector2, storedValues?: Rect, stopAt?: BABYLON.GUI.Control): Vector2;
        static RttToLocalNodeSpace(node: BABYLON.GUI.Control, x: number, y: number, reference?: Vector2, storedValues?: Rect): Vector2;
        static RttToCanvasSpace(x: number, y: number): Vector2;
        static MousePointerToRTTSpace(_node?: BABYLON.GUI.Control, x?: number, y?: number): Vector2;
        private static _ResetMatrixArray;
        static ComputeLocalBounds(node: BABYLON.GUI.Control): Rect;
        /**
         * converts a node's dimensions to percentage, properties can be specified as a list, or can convert all
         * @param guiControl
         * @param properties
         * @param onPropertyChangedObservable
         */
        static ConvertToPercentage(guiControl: BABYLON.GUI.Control, properties?: DimensionProperties[], onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>): void;
        static Round(value: number): number;
        static ConvertToPixels(guiControl: BABYLON.GUI.Control, properties?: DimensionProperties[], onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>): void;
    }


    export interface IGuiGizmoProps {
        globalState: GlobalState;
        control: BABYLON.GUI.Control;
    }
    interface IGuiGizmoState {
        canvasBounds: Rect;
        scalePoints: IScalePoint[];
        scalePointDragging: number;
        isRotating: boolean;
    }
    export class GizmoGeneric extends React.Component<IGuiGizmoProps, IGuiGizmoState> {
        private _storedValues;
        private _localBounds;
        private _rotation;
        private _gizmoUpdateObserver;
        private _pointerUpObserver;
        private _pointerMoveObserver;
        constructor(props: IGuiGizmoProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        /**
         * Update the gizmo's positions
         */
        updateGizmo(): void;
        private _onUp;
        private _onMove;
        private _rotate;
        private _dragLocalBounds;
        private _updateNodeFromLocalBounds;
        private _beginDraggingScalePoint;
        private _beginRotate;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IGizmoLineProps {
        globalState: GlobalState;
        control: BABYLON.GUI.Line;
    }
    /**
     * This class represents the gizmo drawn on a line Control.
     * It is used to scale and rotate the control around a pivot point
     * @param props the properties of the gizmo
     * @returns a gizmo line
     */
    export function GizmoLine(props: IGizmoLineProps): import("react/jsx-runtime").JSX.Element;


    export enum ScalePointPosition {
        Top = -1,
        Left = -1,
        Center = 0,
        Right = 1,
        Bottom = 1
    }
    export interface IScalePoint {
        position: Vector2;
        horizontalPosition: ScalePointPosition;
        verticalPosition: ScalePointPosition;
        rotation: number;
        isPivot: boolean;
        defaultRotation: number;
        id?: number;
    }
    interface IGizmoScalePointProps {
        scalePoint: IScalePoint;
        clickable: boolean;
        key: number;
        onDrag: (event?: React.PointerEvent<HTMLDivElement>, scalePoint?: IScalePoint) => void;
        onRotate: (event?: React.PointerEvent<HTMLDivElement>, scalePoint?: IScalePoint) => void;
        onUp: () => void;
        overrideCursor?: string;
        canRotate: boolean;
        allowClickOnPivot?: boolean;
    }
    export function GizmoScalePoint(props: IGizmoScalePointProps): import("react/jsx-runtime").JSX.Element;


    export interface IGizmoWrapperProps {
        globalState: GlobalState;
    }
    export class GizmoWrapper extends React.Component<IGizmoWrapperProps> {
        observer: Nullable<Observer<void>>;
        componentWillMount(): void;
        componentWillUnmount(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export interface IWorkbenchComponentProps {
        globalState: GlobalState;
    }
    export enum ConstraintDirection {
        NONE = 0,
        X = 2,
        Y = 3
    }
    export class WorkbenchComponent extends React.Component<IWorkbenchComponentProps> {
        private _mouseDown;
        private _rootContainer;
        private _setConstraintDirection;
        private _mouseStartPoint;
        _scene: Scene;
        private _constraintDirection;
        private _panning;
        private _isOverGUINode;
        private _engine;
        private _guiRenderObserver;
        private _doubleClick;
        private _currLeft;
        private _currTop;
        private _controlsHit;
        private _pointerTravelDistance;
        private _processSelectionOnUp;
        private _visibleRegionContainer;
        private _centerZoomMousePosition;
        private _hasPerformedDragZoom;
        private static _addedFonts;
        static get addedFonts(): string[];
        get visibleRegionContainer(): BABYLON.GUI.Container;
        private _panAndZoomContainer;
        get panAndZoomContainer(): BABYLON.GUI.Container;
        private _trueRootContainer;
        set trueRootContainer(value: BABYLON.GUI.Container);
        get trueRootContainer(): BABYLON.GUI.Container;
        private _defaultGUISize;
        private _initialPanningOffset;
        private _panningOffset;
        private _zoomFactor;
        private _zoomModeIncrement;
        private _guiSize;
        private _pasteDisabled;
        get guiSize(): ISize;
        get pasteDisabled(): boolean;
        set guiSize(value: ISize);
        applyEditorTransformation(): void;
        removeEditorTransformation(): void;
        private _reframeWindow;
        constructor(props: IWorkbenchComponentProps);
        keyEvent: (evt: KeyboardEvent) => void;
        copyToClipboard(copyFn: (content: string) => void): void;
        cutToClipboard(copyFn: (content: string) => void): void;
        pasteFromClipboard(clipboardContents: string): boolean;
        CopyGUIControl(original: BABYLON.GUI.Control): void;
        blurEvent: () => void;
        /**
         * Adds editor observers to control and stores old data in metadata
         * @param guiControl
         */
        addEditorBehavior(guiControl: BABYLON.GUI.Control): void;
        /**
         * Removes editor behavior (observables, metadata) from control
         * @param control
         */
        removeEditorBehavior(control: BABYLON.GUI.Control): void;
        dispose(): void;
        loadFromJson(serializationObject: any): void;
        /**
         * Load BABYLON.GUI.Control from Json then select loaded BABYLON.GUI.Control
         * @param serializationObject
         */
        loadControlFromJson(serializationObject: any): void;
        loadFromSnippet(snippetId: string): Promise<void>;
        loadToEditor(): void;
        updateNodeOutlines(): void;
        appendBlock(guiElement: BABYLON.GUI.Control): BABYLON.GUI.Control;
        private parent;
        private _canClone;
        private _controlToLinkedMeshMap;
        private _observersMap;
        private _saveObservables;
        private _restoreObservables;
        private _copyEditorGUIToLiveGUI;
        private _reorderGrid;
        private _isNotChildInsert;
        private _adjustParentingIndex;
        isSelected(value: boolean, guiNode: BABYLON.GUI.Control): void;
        clicked: boolean;
        _onMove(guiControl: BABYLON.GUI.Control, evt: Vector2, startPos: Vector2): void;
        onMove(evt: React.PointerEvent): void;
        private _screenToTexturePosition;
        private getScaledPointerPosition;
        startPanning(): void;
        endPanning(): void;
        processSelection(): void;
        onDown(evt: React.PointerEvent<HTMLElement>): void;
        onUp(evt: React.PointerEvent): void;
        private _syncConnectedLines;
        private _copyLiveGUIToEditorGUI;
        createGUICanvas(embed?: boolean): void;
        synchronizeLiveGUI(): void;
        addControls(scene: Scene): void;
        panning(): void;
        moveControls(moveHorizontal: boolean, amount: number): void;
        zoomWheel(event: React.WheelEvent): void;
        private _panZoomToCenter;
        zoomDrag(event: React.MouseEvent): void;
        zooming(delta: number): void;
        zeroIfClose(vec: Vector3): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    /// <reference types="react" />
    export enum DragOverLocation {
        ABOVE = 0,
        BELOW = 1,
        CENTER = 2,
        NONE = 3
    }
    export enum GUIEditorTool {
        SELECT = 0,
        PAN = 1,
        ZOOM = 2
    }
    export class GlobalState {
        liveGuiTexture: Nullable<BABYLON.GUI.AdvancedDynamicTexture>;
        guiTexture: BABYLON.GUI.AdvancedDynamicTexture;
        hostElement: HTMLElement;
        hostDocument: HTMLDocument;
        hostWindow: Window;
        selectedControls: BABYLON.GUI.Control[];
        onSelectionChangedObservable: Observable<void>;
        onResizeObservable: Observable<ISize>;
        onBuiltObservable: Observable<void>;
        onResetRequiredObservable: Observable<void>;
        onUpdateRequiredObservable: Observable<void>;
        onLogRequiredObservable: Observable<LogEntry>;
        onErrorMessageDialogRequiredObservable: Observable<string>;
        onIsLoadingChanged: Observable<boolean>;
        onSelectionBoxMoved: Observable<ClientRect | DOMRect>;
        onNewSceneObservable: Observable<Nullable<Scene>>;
        onGuiNodeRemovalObservable: Observable<BABYLON.GUI.Control>;
        onPopupClosedObservable: Observable<void>;
        private _backgroundColor;
        private _outlines;
        keys: KeyboardManager;
        private _fromPG;
        /** DO NOT USE: in the process of removing */
        blockKeyboardEvents: boolean;
        onOutlineChangedObservable: Observable<void>;
        controlCamera: boolean;
        selectionLock: boolean;
        workbench: WorkbenchComponent;
        onPropertyChangedObservable: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        private _tool;
        private _usePrevSelected;
        private _prevTool;
        onToolChangeObservable: Observable<void>;
        get tool(): GUIEditorTool;
        set tool(newTool: GUIEditorTool);
        get usePrevSelected(): boolean;
        set usePrevSelected(val: boolean);
        restorePreviousTool(): void;
        onFitControlsToWindowObservable: Observable<void>;
        onReframeWindowObservable: Observable<void>;
        onLoadObservable: Observable<File>;
        onSaveObservable: Observable<void>;
        onSaveSelectedControl: Observable<void>;
        onSnippetLoadObservable: Observable<void>;
        onSnippetSaveObservable: Observable<void>;
        onControlLoadObservable: Observable<File>;
        onResponsiveChangeObservable: Observable<boolean>;
        onParentingChangeObservable: Observable<Nullable<BABYLON.GUI.Control>>;
        onDropObservable: Observable<void>;
        onPropertyGridUpdateRequiredObservable: Observable<void>;
        onDraggingEndObservable: Observable<void>;
        onDraggingStartObservable: Observable<void>;
        onWindowResizeObservable: Observable<void>;
        onGizmoUpdateRequireObservable: Observable<void>;
        onArtBoardUpdateRequiredObservable: Observable<void>;
        onBackgroundColorChangeObservable: Observable<void>;
        onFontsParsedObservable: Observable<void>;
        onPointerMoveObservable: Observable<import("react").PointerEvent<HTMLCanvasElement>>;
        onPointerUpObservable: Observable<Nullable<PointerEvent | import("react").PointerEvent<HTMLCanvasElement>>>;
        draggedControl: Nullable<BABYLON.GUI.Control>;
        draggedControlDirection: DragOverLocation;
        onCopyObservable: Observable<(content: string) => void>;
        onCutObservable: Observable<(content: string) => void>;
        onPasteObservable: Observable<string>;
        isSaving: boolean;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        storeEditorData: (serializationObject: any) => void;
        shiftKeyPressed: boolean;
        customSave?: {
            label: string;
            action: (data: string) => Promise<string>;
        };
        customLoad?: {
            label: string;
            action: (data: string) => Promise<string>;
        };
        constructor();
        /** adds copy, cut and paste listeners to the host window */
        registerEventListeners(): void;
        get backgroundColor(): Color3;
        get fromPG(): boolean;
        set fromPG(value: boolean);
        set backgroundColor(value: Color3);
        get outlines(): boolean;
        set outlines(value: boolean);
        select(control: BABYLON.GUI.Control): void;
        setSelection(controls: BABYLON.GUI.Control[]): void;
        private _findParentControlInTexture;
        deleteSelectedNodes(): void;
        isMultiSelectable(control: BABYLON.GUI.Control): boolean;
        dispose(): void;
    }


    /**
     * Interface used to specify creation options for the gui editor
     */
    export interface IGUIEditorOptions {
        liveGuiTexture?: BABYLON.GUI.AdvancedDynamicTexture;
        customLoad?: {
            label: string;
            action: (data: string) => Promise<string>;
        } | undefined;
        hostElement?: HTMLElement;
        customSave?: {
            label: string;
            action: (data: string) => Promise<string>;
        };
        currentSnippetToken?: string;
        customLoadObservable?: Observable<any>;
    }
    /**
     * Class used to create a gui editor
     */
    export class GUIEditor {
        private static _CurrentState;
        /**
         * Show the gui editor
         * @param options defines the options to use to configure the gui editor
         * @param embed defines whether editor is being opened from the Playground
         */
        static Show(options: IGUIEditorOptions, embed?: boolean): Promise<void>;
    }


    export class GUINodeTools {
        static ImageControlDefaultUrl: string;
        static CreateControlFromString(data: string): BABYLON.GUI.Grid | BABYLON.GUI.Rectangle | BABYLON.GUI.StackPanel | BABYLON.GUI.Line | BABYLON.GUI.TextBlock | BABYLON.GUI.Image | BABYLON.GUI.Slider | BABYLON.GUI.ImageBasedSlider | BABYLON.GUI.RadioButton | BABYLON.GUI.InputText | BABYLON.GUI.ColorPicker | BABYLON.GUI.Ellipse | BABYLON.GUI.Checkbox | BABYLON.GUI.DisplayGrid;
    }




    type Key = "control" | "shift" | "alt" | "space" | "meta";
    export class KeyboardManager {
        private _hostElement;
        private _kdListener;
        private _kuListener;
        private _moveListener;
        private _focusOutListener;
        private _keys;
        onKeyPressedObservable: Observable<Key>;
        constructor(hostElement: HTMLElement | HTMLDocument);
        private _keyEvent;
        private _updateModifierKeys;
        private _setKeyDown;
        private _clearKeys;
        isKeyDown(key: Key): boolean;
        dispose(): void;
    }


    export interface INodeLocationInfo {
        blockId: number;
        x: number;
        y: number;
    }
    export interface IFrameData {
        x: number;
        y: number;
        width: number;
        height: number;
        color: number[];
        name: string;
        isCollapsed: boolean;
        blocks: number[];
        comments: string;
    }
    export interface IEditorData {
        locations: INodeLocationInfo[];
        x: number;
        y: number;
        zoom: number;
        frames?: IFrameData[];
        map?: {
            [key: number]: number;
        };
    }


    interface IPortalProps {
        globalState: GlobalState;
    }
    export class Portal extends React.Component<IPortalProps> {
        render(): React.ReactPortal;
    }


    export class Tools {
        static LookForItems(item: any, selectedEntities: any[], firstIteration?: boolean): boolean;
        private static _RecursiveRemoveHiddenMeshesAndHoistChildren;
        static SortAndFilter(parent: any, items: any[]): any[];
        static GetCellInfo(grid: BABYLON.GUI.Grid, control: BABYLON.GUI.Control): Vector2;
        static ReorderGrid(grid: BABYLON.GUI.Grid, index: number, control: BABYLON.GUI.Control, cell: Vector2): void;
    }


    interface IGraphEditorProps {
        globalState: GlobalState;
    }
    interface IGraphEditorState {
        showPreviewPopUp: boolean;
        toolbarExpand: boolean;
        message: string;
    }
    export class WorkbenchEditor extends React.Component<IGraphEditorProps, IGraphEditorState> {
        private _moveInProgress;
        private _leftWidth;
        private _rightWidth;
        private _popUpWindow;
        private _draggedItem;
        private _rootRef;
        private _onErrorMessageObserver;
        componentDidMount(): void;
        componentWillUnmount(): void;
        addToolControls: (evt: KeyboardEvent) => void;
        removePressToolControls: (evt: KeyboardEvent) => void;
        constructor(props: IGraphEditorProps);
        showWaitScreen(): void;
        hideWaitScreen(): void;
        onPointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
        onPointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
        resizeColumns(evt: React.PointerEvent<HTMLDivElement>, forLeft?: boolean): void;
        buildColumnLayout(): string;
        handlePopUp: () => void;
        handleClosingPopUp: () => void;
        createPopupWindow: (title: string, windowVariableName: string, width?: number, height?: number) => Window | null;
        copyStyles: (sourceDoc: HTMLDocument, targetDoc: HTMLDocument) => void;
        switchExpandedState(): void;
        render(): import("react/jsx-runtime").JSX.Element;
        onCreate(value: string): BABYLON.GUI.Control;
        createBlackLine(): import("react/jsx-runtime").JSX.Element;
        createToolbarHelper(ct: {
            className: string;
            icon: string;
        }[]): import("react/jsx-runtime").JSX.Element[];
        createToolbar(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface IColorComponentEntryProps {
        value: number;
        label: string;
        max?: number;
        min?: number;
        onChange: (value: number) => void;
        disabled?: boolean;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
    }
    export class ColorComponentEntry extends React.Component<IColorComponentEntryProps> {
        constructor(props: IColorComponentEntryProps);
        updateValue(valueString: string): void;
        lock(): void;
        unlock(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /**
     * Interface used to specify creation options for color picker
     */
    export interface IColorPickerProps {
        color: Color3 | Color4;
        linearhint?: boolean;
        debugMode?: boolean;
        onColorChanged?: (color: Color3 | Color4) => void;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
    }
    /**
     * Interface used to specify creation options for color picker
     */
    export interface IColorPickerState {
        color: Color3;
        alpha: number;
    }
    /**
     * Class used to create a color picker
     */
    export class ColorPicker extends React.Component<IColorPickerProps, IColorPickerState> {
        private _saturationRef;
        private _hueRef;
        private _isSaturationPointerDown;
        private _isHuePointerDown;
        constructor(props: IColorPickerProps);
        shouldComponentUpdate(nextProps: IColorPickerProps, nextState: IColorPickerState): boolean;
        onSaturationPointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
        onSaturationPointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
        onSaturationPointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
        private _evaluateSaturation;
        private _evaluateHue;
        componentDidUpdate(): void;
        raiseOnColorChanged(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface IHexColorProps {
        value: string;
        expectedLength: number;
        onChange: (value: string) => void;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
    }
    export class HexColor extends React.Component<IHexColorProps, {
        hex: string;
    }> {
        constructor(props: IHexColorProps);
        shouldComponentUpdate(nextProps: IHexColorProps, nextState: {
            hex: string;
        }): boolean;
        lock(): void;
        unlock(): void;
        updateHexValue(valueString: string): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface ICommandBarComponentProps {
        onSaveButtonClicked?: () => void;
        onSaveToSnippetButtonClicked?: () => void;
        onLoadFromSnippetButtonClicked?: () => void;
        onHelpButtonClicked?: () => void;
        onGiveFeedbackButtonClicked?: () => void;
        onSelectButtonClicked?: () => void;
        onPanButtonClicked?: () => void;
        onZoomButtonClicked?: () => void;
        onFitButtonClicked?: () => void;
        onArtboardColorChanged?: (newColor: string) => void;
        artboardColor?: string;
        artboardColorPickerColor?: string;
    }
    export var CommandBarComponent: React.FC<ICommandBarComponentProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface ICommandButtonComponentProps {
        tooltip: string;
        shortcut?: string;
        icon: string;
        iconLabel?: string;
        isActive: boolean;
        onClick: () => void;
        disabled?: boolean;
    }
    export var CommandButtonComponent: React.FC<ICommandButtonComponentProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface ICommandDropdownComponentProps {
        icon?: string;
        tooltip: string;
        defaultValue?: string;
        items: {
            label: string;
            icon?: string;
            fileButton?: boolean;
            onClick?: () => void;
            onCheck?: (value: boolean) => void;
            storeKey?: string;
            isActive?: boolean;
            defaultValue?: boolean | string;
            subItems?: string[];
        }[];
        toRight?: boolean;
    }
    export class CommandDropdownComponent extends React.Component<ICommandDropdownComponentProps, {
        isExpanded: boolean;
        activeState: string;
    }> {
        constructor(props: ICommandDropdownComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /// <reference types="react" />
    export type ButtonProps = {
        disabled?: boolean;
        active?: boolean;
        onClick?: () => void;
        color: "light" | "dark";
        size: "default" | "small" | "wide" | "smaller";
        title?: string;
        backgroundColor?: string;
    };
    export var Button: React.FC<ButtonProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export function ClassNames(names: any, styleObject: any): string;
    export function JoinClassNames(styleObject: any, ...names: string[]): string;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface IColorComponentEntryProps {
        value: number;
        label: string;
        max?: number;
        min?: number;
        onChange: (value: number) => void;
        disabled?: boolean;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
    }
    export class ColorComponentComponentEntry extends React.Component<IColorComponentEntryProps> {
        constructor(props: IColorComponentEntryProps);
        updateValue(valueString: string): void;
        lock(): void;
        unlock(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /**
     * Interface used to specify creation options for color picker
     */
    export interface IColorPickerComponentProps {
        color: Color3 | Color4;
        linearhint?: boolean;
        debugMode?: boolean;
        onColorChanged?: (color: Color3 | Color4) => void;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        backgroundColor?: string;
    }
    /**
     * Interface used to specify creation options for color picker
     */
    export interface IColorPickerState {
        color: Color3;
        alpha: number;
    }
    /**
     * Class used to create a color picker
     */
    export class ColorPickerComponent extends React.Component<IColorPickerComponentProps, IColorPickerState> {
        private _saturationRef;
        private _hueRef;
        private _isSaturationPointerDown;
        private _isHuePointerDown;
        constructor(props: IColorPickerComponentProps);
        shouldComponentUpdate(nextProps: IColorPickerComponentProps, nextState: IColorPickerState): boolean;
        onSaturationPointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
        onSaturationPointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
        onSaturationPointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
        private _evaluateSaturation;
        private _evaluateHue;
        componentDidUpdate(): void;
        raiseOnColorChanged(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface IHexColorProps {
        value: string;
        expectedLength: number;
        onChange: (value: string) => void;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
    }
    export class HexColorComponent extends React.Component<IHexColorProps, {
        hex: string;
    }> {
        constructor(props: IHexColorProps);
        shouldComponentUpdate(nextProps: IHexColorProps, nextState: {
            hex: string;
        }): boolean;
        lock(): void;
        unlock(): void;
        updateHexValue(valueString: string): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /// <reference types="react" />
    export type IconProps = {
        color?: "dark" | "light";
        icon: string;
    };
    export var Icon: React.FC<IconProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export type LabelProps = {
        text: string;
        children?: React.ReactChild;
        color?: "dark" | "light";
    };
    export var Label: React.FC<LabelProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /**
     * Arguments for the DraggableIcon component.
     */
    export interface IDraggableIconProps {
        /**
         * Icon source
         */
        src: string;
        /**
         * Object that will be passed to the drag event
         */
        item: BABYLON.GuiEditor.SharedUIComponents.TabDrag;
        /**
         * Type of drag event
         */
        type: BABYLON.GuiEditor.SharedUIComponents.ElementTypes;
    }
    /**
     * An icon that can be dragged by the user
     * @param props properties
     * @returns draggable icon element
     */
    export var DraggableIcon: React.FC<IDraggableIconProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /**
     * Arguments for the Column component.
     */
    export interface IFlexibleColumnProps {
        /**
         * Width of column
         */
        width: string;
    }
    /**
     * This component represents a single column in the layout. It receives a width
     * that it occupies and the content to display
     * @param props
     * @returns
     */
    export var FlexibleColumn: React.FC<IFlexibleColumnProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /**
     * Arguments for the DragHandler component.
     */
    export interface IFlexibleDragHandlerProps {
        /**
         * The size of the containing element. Used to calculate the percentage of
         * space occupied by the component
         */
        containerSize: {
            width: number;
            height: number;
        };
    }
    /**
     * This component receives the drop events and updates the layout accordingly
     * @param props properties
     * @returns DragHandler element
     */
    export var FlexibleDragHandler: React.FC<IFlexibleDragHandlerProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /**
     * Arguments for the FlexibleDropZone component.
     */
    export interface IFlexibleDropZoneProps {
        /**
         * The row number of the component in the layout
         */
        rowNumber: number;
        /**
         * The column number of the component in the layout
         */
        columnNumber: number;
    }
    /**
     * This component contains the drag and drop zone for the resize bars that
     * allow redefining width and height of layout elements
     * @param props properties
     * @returns drop zone element
     */
    export var FlexibleDropZone: React.FC<IFlexibleDropZoneProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /**
     * Arguments for the GridContainer component.
     */
    export interface IFlexibleGridContainerProps {
    }
    /**
     * Component responsible for mapping the layout to the actual components
     * @returns GridContainer element
     */
    export var FlexibleGridContainer: React.FC<IFlexibleGridContainerProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /**
     * Arguments for the BABYLON.GuiEditor.SharedUIComponents.Layout component.
     */
    export interface IFlexibleGridLayoutProps {
        /**
         * A definition of the layout which can be changed by the user
         */
        layoutDefinition: BABYLON.GuiEditor.SharedUIComponents.Layout;
    }
    /**
     * This component represents a grid layout that can be resized and rearranged
     * by the user.
     * @param props properties
     * @returns layout element
     */
    export var FlexibleGridLayout: React.FC<IFlexibleGridLayoutProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /**
     * Arguments for the ResizeBar component.
     */
    export interface IFlexibleRowResizerProps {
        /**
         * Row number of the component that is being resized
         */
        rowNumber: number;
        /**
         * Column number of the component being resized
         */
        columnNumber: number;
        /**
         * If the resizing happens in row or column direction
         */
        direction: BABYLON.GuiEditor.SharedUIComponents.ResizeDirections;
    }
    /**
     * The item that will be sent to the drag event
     */
    export type ResizeItem = {
        /**
         * If the resizing happens in row or column direction
         */
        direction: BABYLON.GuiEditor.SharedUIComponents.ResizeDirections;
        /**
         * The row number of the component that is being resized
         */
        rowNumber: number;
        /**
         * the column number of the component being resized
         */
        columnNumber: number;
    };
    /**
     * A component that renders a bar that the user can drag to resize.
     * @param props properties
     * @returns resize bar element
     */
    export var FlexibleResizeBar: React.FC<IFlexibleRowResizerProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /**
     * Arguments for the FlexibleTab component.
     */
    export interface IFlexibleTabProps {
        /**
         * The tab's title.
         */
        title: string;
        /**
         * If the tab is currently selected or not
         */
        selected: boolean;
        /**
         * What happens when the user clicks on the tab
         */
        onClick: () => void;
        /**
         * The object that will be sent to the drag event
         */
        item: BABYLON.GuiEditor.SharedUIComponents.TabDrag;
        /**
         * What happens when the user drops another tab after this one
         */
        onTabDroppedAction: (item: BABYLON.GuiEditor.SharedUIComponents.TabDrag) => void;
    }
    /**
     * A component that renders a tab that the user can click
     * to activate or drag to reorder. It also listens for
     * drop events if the user wants to drop another tab
     * after it.
     * @param props properties
     * @returns FlexibleTab element
     */
    export var FlexibleTab: React.FC<IFlexibleTabProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /**
     * Arguments for the TabsContainer component.
     */
    export interface IFlexibleTabsContainerProps {
        /**
         * The tabs to display
         */
        tabs: BABYLON.GuiEditor.SharedUIComponents.LayoutTab[];
        /**
         * Row index of component in layout
         */
        rowIndex: number;
        /**
         * Column index of component in layout
         */
        columnIndex: number;
        /**
         * Which tab is selected in the layout
         */
        selectedTab?: string;
    }
    /**
     * This component contains a set of tabs of which only one is visible at a time.
     * The tabs can also be dragged from and to different containers.
     * @param props properties
     * @returns tabs container element
     */
    export var FlexibleTabsContainer: React.FC<IFlexibleTabsContainerProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /// <reference types="react" />
    export var LayoutContext: import("react").Context<{
        /**
         * The layout object
         */
        layout: BABYLON.GuiEditor.SharedUIComponents.Layout;
        /**
         * Function to set the layout object in the context
         */
        setLayout: (layout: BABYLON.GuiEditor.SharedUIComponents.Layout) => void;
    }>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export type LayoutTab = {
        /**
         * Tab id
         */
        id: string;
        /**
         * React component rendered by tab
         */
        component: React.ReactElement;
        /**
         * Tab title
         */
        title: string;
    };
    export type LayoutTabsRow = {
        /**
         * row id
         */
        id: string;
        /**
         * row height in its containing column
         */
        height: string;
        /**
         * selected tab in row
         */
        selectedTab: string;
        /**
         * list of tabs contained in row
         */
        tabs: LayoutTab[];
    };
    export type LayoutColumn = {
        /**
         * column id
         */
        id: string;
        /**
         * column width in the grid
         */
        width: string;
        /**
         * column rows
         */
        rows: LayoutTabsRow[];
    };
    export type Layout = {
        /**
         * layout columns
         */
        columns?: LayoutColumn[];
    };
    export type TabDrag = {
        /**
         * row number of the tab being dragged
         */
        rowNumber: number;
        /**
         * column number of the tab being dragged
         */
        columnNumber: number;
        /**
         * the tabs being dragged
         */
        tabs: {
            /**
             * id of tab being dragged
             */
            id: string;
        }[];
    };
    export enum ElementTypes {
        RESIZE_BAR = "0",
        TAB = "1",
        TAB_GROUP = "2",
        NONE = "2"
    }
    export enum ResizeDirections {
        ROW = "row",
        COLUMN = "column"
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /**
     * Given a column and row number in the layout, return the corresponding column/row
     * @param layout
     * @param column
     * @param row
     * @returns
     */
    export const getPosInLayout: (layout: BABYLON.GuiEditor.SharedUIComponents.Layout, column: number, row?: number) => BABYLON.GuiEditor.SharedUIComponents.LayoutColumn | BABYLON.GuiEditor.SharedUIComponents.LayoutTabsRow;
    /**
     * Remove a row in position row, column from the layout, and redistribute heights of remaining rows
     * @param layout
     * @param column
     * @param row
     */
    export const removeLayoutRowAndRedistributePercentages: (layout: BABYLON.GuiEditor.SharedUIComponents.Layout, column: number, row: number) => void;
    /**
     * Add a percentage string to a number
     * @param p1 the percentage string
     * @param p2 the number
     * @returns the sum of the percentage string and the number
     */
    export const addPercentageStringToNumber: (p1: string, p2: number) => number;
    /**
     * Parses a percentage string into a number
     * @param p the percentage string
     * @returns the parsed number
     */
    export const parsePercentage: (p: string) => number;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface IColorLineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        onPropertyChangedObservable: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        onChange?: () => void;
        isLinear?: boolean;
        icon?: string;
        iconLabel?: string;
        disableAlpha?: boolean;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
    }
    interface IColorLineComponentState {
        isExpanded: boolean;
        color: Color4;
    }
    export class ColorLineComponent extends React.Component<IColorLineComponentProps, IColorLineComponentState> {
        constructor(props: IColorLineComponentProps);
        shouldComponentUpdate(nextProps: IColorLineComponentProps, nextState: IColorLineComponentState): boolean;
        getValue(props?: Readonly<IColorLineComponentProps> & Readonly<{
            children?: React.ReactNode;
        }>): Color4;
        setColorFromString(colorString: string): void;
        setColor(newColor: Color4): void;
        switchExpandState(): void;
        updateStateR(value: number): void;
        updateStateG(value: number): void;
        updateStateB(value: number): void;
        updateStateA(value: number): void;
        copyToClipboard(): void;
        private _convertToColor;
        private _toColor3;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface IColorPickerLineComponentProps {
        value: Color4 | Color3;
        linearHint?: boolean;
        onColorChanged: (newOne: string) => void;
        icon?: string;
        iconLabel?: string;
        shouldPopRight?: boolean;
        lockObject?: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        backgroundColor?: string;
    }
    interface IColorPickerComponentState {
        pickerEnabled: boolean;
        color: Color3 | Color4;
        hex: string;
    }
    export class ColorPickerLineComponent extends React.Component<IColorPickerLineComponentProps, IColorPickerComponentState> {
        private _floatRef;
        private _floatHostRef;
        private _coverRef;
        constructor(props: IColorPickerLineComponentProps);
        syncPositions(): void;
        shouldComponentUpdate(nextProps: IColorPickerLineComponentProps, nextState: IColorPickerComponentState): boolean;
        getHexString(props?: Readonly<IColorPickerLineComponentProps> & Readonly<{
            children?: React.ReactNode;
        }>): string;
        componentDidUpdate(): void;
        componentDidMount(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface IFileButtonLineComponentProps {
        label: string;
        onClick: (file: File) => void;
        accept: string;
        icon?: string;
        iconLabel?: string;
    }
    export class FileButtonLineComponent extends React.Component<IFileButtonLineComponentProps> {
        private static _IDGenerator;
        private _id;
        private _uploadInputRef;
        constructor(props: IFileButtonLineComponentProps);
        onChange(evt: any): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface INumericInputComponentProps {
        label: string;
        value: number;
        step?: number;
        onChange: (value: number) => void;
        precision?: number;
        icon?: string;
        iconLabel?: string;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
    }
    export class NumericInputComponent extends React.Component<INumericInputComponentProps, {
        value: string;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: INumericInputComponentProps);
        componentWillUnmount(): void;
        shouldComponentUpdate(nextProps: INumericInputComponentProps, nextState: {
            value: string;
        }): boolean;
        updateValue(valueString: string): void;
        onBlur(): void;
        incrementValue(amount: number): void;
        onKeyDown(evt: React.KeyboardEvent<HTMLInputElement>): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /**
     * This components represents an options menu with optional
     * customizable properties. Option IDs should be unique.
     */
    export interface IOption {
        label: string;
        value: string;
        id: string;
    }
    export interface IOptionsLineComponentProps {
        options: IOption[];
        addOptionPlaceholder?: string;
        onOptionAdded?: (newOption: IOption) => void;
        onOptionSelected: (selectedOptionValue: string) => void;
        selectedOptionValue: string;
        validateNewOptionValue?: (newOptionValue: string) => boolean;
        addOptionText?: string;
    }
    export const OptionsLineComponent: (props: IOptionsLineComponentProps) => import("react/jsx-runtime").JSX.Element;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface MessageDialogProps {
        message: string;
        isError: boolean;
        onClose?: () => void;
    }
    export var MessageDialog: React.FC<MessageDialogProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /**
     * Props for the connector
     */
    export interface IGraphConnectorHandlerProps {
        /**
         * id of the parent node
         */
        parentId: string;
        /**
         * x position of the parent node
         */
        parentX: number;
        /**
         * y position of the parent node
         */
        parentY: number;
        /**
         * x position of the connector relative to the parent node
         */
        offsetX?: number;
        /**
         * y position of the connector relative to the parent node
         */
        offsetY?: number;
        /**
         * width of the parent node
         */
        parentWidth: number;
        /**
         * height of the parent node
         */
        parentHeight: number;
        /**
         * id of the container where its parent node is
         */
        parentContainerId: string;
    }
    /**
     * This component is used to initiate a connection between two nodes. Simply
     * drag the handle in a node and drop it in another node to create a connection.
     * @returns connector element
     */
    export var GraphConnectorHandler: React.FC<IGraphConnectorHandlerProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface IGraphContainerProps {
    }
    /**
     * This component is just a simple container to keep the nodes and lines containers
     * together
     * @param props
     * @returns
     */
    export var GraphContainer: React.FC<IGraphContainerProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /// <reference types="react" />
    /**
     * this context is used to pass callbacks to the graph nodes and connections
     */
    export interface IGraphContext {
        onNodesConnected?: (sourceId: string, targetId: string) => void;
        onLineSelected?: (lineId: string) => void;
        onNodeSelected?: (nodeId: string) => void;
    }
    export var GraphContextManager: import("react").Context<IGraphContext>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /**
     * props for the GraphLine component
     */
    export interface IGraphLineProps {
        /**
         * id of the line. temporary lines can have no id
         */
        id?: string;
        /**
         * starting x pos of the line
         */
        x1: number;
        /**
         * ending x pos of the line
         */
        x2: number;
        /**
         * starting y pos of the line
         */
        y1: number;
        /**
         * ending y pos of the line
         */
        y2: number;
        /**
         * is the line selected
         */
        selected?: boolean;
        /**
         * does the line have a direction
         */
        directional?: boolean;
    }
    export const MarkerArrowId = "arrow";
    /**
     * This component draws a SVG line between two points, with an optional marker
     * indicating direction
     * @param props properties
     * @returns graph line element
     */
    export var GraphLine: React.FC<IGraphLineProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /**
     * props for the GraphLineContainer
     */
    export interface IGraphLinesContainerProps {
        /**
         * id of the container
         */
        id: string;
    }
    /**
     * this component handles the dragging of new connections
     * @param props
     * @returns
     */
    export var GraphLinesContainer: React.FC<IGraphLinesContainerProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface IGraphNodeProps {
        id: string;
        name: string;
        x: number;
        y: number;
        selected?: boolean;
        width?: number;
        height?: number;
        highlighted?: boolean;
        parentContainerId: string;
    }
    export var SingleGraphNode: React.FC<IGraphNodeProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface IGraphContainerProps {
        onNodeMoved: (id: string, x: number, y: number) => void;
        id: string;
    }
    /**
     * This component contains all the nodes and handles their dragging
     * @param props properties
     * @returns graph node container element
     */
    export var GraphNodesContainer: React.FC<IGraphContainerProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export type IVisualRecordsType = Record<string, {
        x: number;
        y: number;
    }>;
    export type IConnectionType = {
        id: string;
        sourceId: string;
        targetId: string;
    };
    export type ICustomDataType = {
        type: string;
        value: any;
    };
    export type INodeType = {
        id: string;
        label: string;
        customData?: ICustomDataType;
    };
    /**
     * props for the node renderer
     */
    export interface INodeRendererProps {
        /**
         * array of connections between nodes
         */
        connections: IConnectionType[];
        /**
         * function called when a new connection is created
         */
        updateConnections: (sourceId: string, targetId: string) => void;
        /**
         * function called when a connection is deleted
         */
        deleteLine: (lineId: string) => void;
        /**
         * function called when a node is deleted
         */
        deleteNode: (nodeId: string) => void;
        /**
         * array of all nodes
         */
        nodes: INodeType[];
        /**
         * id of the node to highlight
         */
        highlightedNode?: Nullable<string>;
        /**
         * function to be called if a node is selected
         */
        selectNode?: (nodeId: Nullable<string>) => void;
        /**
         * id of this renderer
         */
        id: string;
        /**
         * optional list of custom components to be rendered inside nodes of
         * a certain type
         */
        customComponents?: Record<string, React.ComponentType<any>>;
    }
    /**
     * This component is a bridge between the app logic related to the graph, and the actual rendering
     * of it. It manages the nodes' positions and selection states.
     * @param props
     * @returns
     */
    export const NodeRenderer: (props: INodeRendererProps) => import("react/jsx-runtime").JSX.Element;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /**
     * utility hook to assist using the graph context
     * @returns
     */
    export const useGraphContext: () => IGraphContext;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface ITextInputProps {
        label?: string;
        placeholder?: string;
        submitValue: (newValue: string) => void;
        validateValue?: (value: string) => boolean;
        cancelSubmit?: () => void;
    }
    /**
     * This component represents a text input that can be submitted or cancelled on buttons
     * @param props properties
     * @returns TextInputWithSubmit element
     */
    export const TextInputWithSubmit: (props: ITextInputProps) => import("react/jsx-runtime").JSX.Element;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /// <reference types="react" />
    export type ToggleProps = {
        toggled: "on" | "mixed" | "off";
        onToggle?: () => void;
        padded?: boolean;
        color?: "dark" | "light";
    };
    export var Toggle: React.FC<ToggleProps>;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export function copyCommandToClipboard(strCommand: string): void;
    export function getClassNameWithNamespace(obj: any): {
        className: string;
        babylonNamespace: string;
    };



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface IBooleanLineComponentProps {
        label: string;
        value: boolean;
        icon?: string;
        iconLabel?: string;
    }
    export class BooleanLineComponent extends React.Component<IBooleanLineComponentProps> {
        constructor(props: IBooleanLineComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface IButtonLineComponentProps {
        label: string;
        onClick: () => void;
        icon?: string;
        iconLabel?: string;
        isDisabled?: boolean;
    }
    export class ButtonLineComponent extends React.Component<IButtonLineComponentProps> {
        constructor(props: IButtonLineComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface ICheckBoxLineComponentProps {
        label?: string;
        target?: any;
        propertyName?: string;
        isSelected?: () => boolean;
        onSelect?: (value: boolean) => void;
        onValueChanged?: () => void;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        disabled?: boolean;
        icon?: string;
        iconLabel?: string;
        faIcons?: {
            enabled: any;
            disabled: any;
        };
        large?: boolean;
    }
    export class CheckBoxLineComponent extends React.Component<ICheckBoxLineComponentProps, {
        isSelected: boolean;
        isDisabled?: boolean;
        isConflict: boolean;
    }> {
        private _localChange;
        constructor(props: ICheckBoxLineComponentProps);
        shouldComponentUpdate(nextProps: ICheckBoxLineComponentProps, nextState: {
            isSelected: boolean;
            isDisabled: boolean;
            isConflict: boolean;
        }): boolean;
        onChange(): void;
        onCopyClick(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface IColor3LineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        isLinear?: boolean;
        icon?: string;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        iconLabel?: string;
        onChange?: () => void;
    }
    export class Color3LineComponent extends React.Component<IColor3LineComponentProps> {
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface IColor4LineComponentProps {
        label: string;
        target?: any;
        propertyName: string;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        onChange?: () => void;
        isLinear?: boolean;
        icon?: string;
        iconLabel?: string;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
    }
    export class Color4LineComponent extends React.Component<IColor4LineComponentProps> {
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface IColorLineProps {
        label: string;
        target?: any;
        propertyName: string;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        onChange?: () => void;
        isLinear?: boolean;
        icon?: string;
        iconLabel?: string;
        disableAlpha?: boolean;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
    }
    interface IColorLineComponentState {
        isExpanded: boolean;
        color: Color4;
    }
    export class ColorLine extends React.Component<IColorLineProps, IColorLineComponentState> {
        constructor(props: IColorLineProps);
        shouldComponentUpdate(nextProps: IColorLineProps, nextState: IColorLineComponentState): boolean;
        getValue(props?: Readonly<IColorLineProps> & Readonly<{
            children?: React.ReactNode;
        }>): Color4;
        setColorFromString(colorString: string): void;
        setColor(newColor: Color4): void;
        switchExpandState(): void;
        updateStateR(value: number): void;
        updateStateG(value: number): void;
        updateStateB(value: number): void;
        updateStateA(value: number): void;
        private _convertToColor;
        private _toColor3;
        onCopyClick(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface IColorPickerLineProps {
        value: Color4 | Color3;
        linearHint?: boolean;
        onColorChanged: (newOne: string) => void;
        icon?: string;
        iconLabel?: string;
        shouldPopRight?: boolean;
        lockObject?: BABYLON.GuiEditor.SharedUIComponents.LockObject;
    }
    interface IColorPickerComponentState {
        pickerEnabled: boolean;
        color: Color3 | Color4;
        hex: string;
    }
    export class ColorPickerLine extends React.Component<IColorPickerLineProps, IColorPickerComponentState> {
        private _floatRef;
        private _floatHostRef;
        constructor(props: IColorPickerLineProps);
        syncPositions(): void;
        shouldComponentUpdate(nextProps: IColorPickerLineProps, nextState: IColorPickerComponentState): boolean;
        getHexString(props?: Readonly<IColorPickerLineProps> & Readonly<{
            children?: React.ReactNode;
        }>): string;
        componentDidUpdate(): void;
        componentDidMount(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface IButtonLineComponentProps {
        data: string;
        tooltip: string;
    }
    export class DraggableLineComponent extends React.Component<IButtonLineComponentProps> {
        constructor(props: IButtonLineComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IFileButtonLineProps {
        label: string;
        onClick: (file: File) => void;
        accept: string;
        icon?: string;
        iconLabel?: string;
    }
    export class FileButtonLine extends React.Component<IFileButtonLineProps> {
        private static _IDGenerator;
        private _id;
        private _uploadInputRef;
        constructor(props: IFileButtonLineProps);
        onChange(evt: any): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IFileMultipleButtonLineComponentProps {
        label: string;
        onClick: (event: any) => void;
        accept: string;
        icon?: string;
        iconLabel?: string;
    }
    export class FileMultipleButtonLineComponent extends React.Component<IFileMultipleButtonLineComponentProps> {
        private static _IDGenerator;
        private _id;
        private _uploadInputRef;
        constructor(props: IFileMultipleButtonLineComponentProps);
        onChange(evt: any): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IFloatLineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onChange?: (newValue: number) => void;
        isInteger?: boolean;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        additionalClass?: string;
        step?: string;
        digits?: number;
        useEuler?: boolean;
        min?: number;
        max?: number;
        smallUI?: boolean;
        onEnter?: (newValue: number) => void;
        icon?: string;
        iconLabel?: string;
        defaultValue?: number;
        arrows?: boolean;
        unit?: React.ReactNode;
        onDragStart?: (newValue: number) => void;
        onDragStop?: (newValue: number) => void;
        disabled?: boolean;
    }
    export class FloatLineComponent extends React.Component<IFloatLineComponentProps, {
        value: string;
        dragging: boolean;
    }> {
        private _localChange;
        private _store;
        constructor(props: IFloatLineComponentProps);
        componentWillUnmount(): void;
        getValueString(value: any, props: IFloatLineComponentProps): string;
        shouldComponentUpdate(nextProps: IFloatLineComponentProps, nextState: {
            value: string;
            dragging: boolean;
        }): boolean;
        raiseOnPropertyChanged(newValue: number, previousValue: number): void;
        updateValue(valueString: string): void;
        lock(): void;
        unlock(): void;
        incrementValue(amount: number, processStep?: boolean): void;
        onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void;
        onCopyClick(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IHexLineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        lockObject?: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onChange?: (newValue: number) => void;
        isInteger?: boolean;
        replaySourceReplacement?: string;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        additionalClass?: string;
        step?: string;
        digits?: number;
        useEuler?: boolean;
        min?: number;
        icon?: string;
        iconLabel?: string;
    }
    export class HexLineComponent extends React.Component<IHexLineComponentProps, {
        value: string;
    }> {
        private _localChange;
        private _store;
        private _propertyChange;
        constructor(props: IHexLineComponentProps);
        componentWillUnmount(): void;
        shouldComponentUpdate(nextProps: IHexLineComponentProps, nextState: {
            value: string;
        }): boolean;
        raiseOnPropertyChanged(newValue: number, previousValue: number): void;
        convertToHexString(valueString: string): string;
        updateValue(valueString: string, raisePropertyChanged: boolean): void;
        lock(): void;
        unlock(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface IIconButtonLineComponentProps {
        icon: string;
        onClick: () => void;
        tooltip: string;
        active?: boolean;
    }
    export class IconButtonLineComponent extends React.Component<IIconButtonLineComponentProps> {
        constructor(props: IIconButtonLineComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IIconComponentProps {
        icon: string;
        label?: string;
    }
    export class IconComponent extends React.Component<IIconComponentProps> {
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IIndentedTextLineComponentProps {
        value?: string;
        color?: string;
        underline?: boolean;
        onLink?: () => void;
        url?: string;
        additionalClass?: string;
    }
    export class IndentedTextLineComponent extends React.Component<IIndentedTextLineComponentProps> {
        constructor(props: IIndentedTextLineComponentProps);
        onLink(): void;
        renderContent(): import("react/jsx-runtime").JSX.Element;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IInputArrowsComponentProps {
        incrementValue: (amount: number) => void;
        setDragging: (dragging: boolean) => void;
    }
    export class InputArrowsComponent extends React.Component<IInputArrowsComponentProps> {
        private _arrowsRef;
        private _drag;
        private _releaseListener;
        private _lockChangeListener;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface ISelectedLineContainer {
        selectedLineContainerTitles: Array<string>;
        selectedLineContainerTitlesNoFocus: Array<string>;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface ILineContainerComponentProps {
        selection?: BABYLON.GuiEditor.SharedUIComponents.ISelectedLineContainer;
        title: string;
        children: any[] | any;
        closed?: boolean;
    }
    export class LineContainerComponent extends React.Component<ILineContainerComponentProps, {
        isExpanded: boolean;
        isHighlighted: boolean;
    }> {
        constructor(props: ILineContainerComponentProps);
        switchExpandedState(): void;
        renderHeader(): import("react/jsx-runtime").JSX.Element;
        componentDidMount(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface ILinkButtonComponentProps {
        label: string;
        buttonLabel: string;
        url?: string;
        onClick: () => void;
        icon?: any;
        onIconClick?: () => void;
    }
    export class LinkButtonComponent extends React.Component<ILinkButtonComponentProps> {
        constructor(props: ILinkButtonComponentProps);
        onLink(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IMatrixLineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        step?: number;
        onChange?: (newValue: Matrix) => void;
        onModeChange?: (mode: number) => void;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        mode?: number;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
    }
    export class MatrixLineComponent extends React.Component<IMatrixLineComponentProps, {
        value: Matrix;
        mode: number;
        angle: number;
    }> {
        private _localChange;
        constructor(props: IMatrixLineComponentProps);
        shouldComponentUpdate(nextProps: IMatrixLineComponentProps, nextState: {
            value: Matrix;
            mode: number;
            angle: number;
        }): boolean;
        raiseOnPropertyChanged(previousValue: Vector3): void;
        updateMatrix(): void;
        updateRow(value: Vector4, row: number): void;
        updateBasedOnMode(value: number): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IMessageLineComponentProps {
        text: string;
        color?: string;
        icon?: any;
    }
    export class MessageLineComponent extends React.Component<IMessageLineComponentProps> {
        constructor(props: IMessageLineComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface INumericInputProps {
        label: string;
        value: number;
        step?: number;
        onChange: (value: number) => void;
        precision?: number;
        icon?: string;
        iconLabel?: string;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
    }
    export class NumericInput extends React.Component<INumericInputProps, {
        value: string;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: INumericInputProps);
        componentWillUnmount(): void;
        shouldComponentUpdate(nextProps: INumericInputProps, nextState: {
            value: string;
        }): boolean;
        updateValue(valueString: string): void;
        onBlur(): void;
        incrementValue(amount: number): void;
        onKeyDown(evt: React.KeyboardEvent<HTMLInputElement>): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export var Null_Value: number;
    export interface IOptionsLineProps {
        label: string;
        target: any;
        propertyName: string;
        options: IInspectableOptions[];
        noDirectUpdate?: boolean;
        onSelect?: (value: number | string) => void;
        extractValue?: (target: any) => number | string;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        allowNullValue?: boolean;
        icon?: string;
        iconLabel?: string;
        className?: string;
        valuesAreStrings?: boolean;
        defaultIfNull?: number;
    }
    export class OptionsLine extends React.Component<IOptionsLineProps, {
        value: number | string;
    }> {
        private _localChange;
        private _remapValueIn;
        private _remapValueOut;
        private _getValue;
        constructor(props: IOptionsLineProps);
        shouldComponentUpdate(nextProps: IOptionsLineProps, nextState: {
            value: number;
        }): boolean;
        raiseOnPropertyChanged(newValue: number, previousValue: number): void;
        setValue(value: string | number): void;
        updateValue(valueString: string): void;
        onCopyClick(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export class Popup {
        static CreatePopup(title: string, windowVariableName: string, width?: number, height?: number): HTMLDivElement | null;
        private static _CopyStyles;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IRadioButtonLineComponentProps {
        onSelectionChangedObservable: Observable<RadioButtonLineComponent>;
        label: string;
        isSelected: () => boolean;
        onSelect: () => void;
        icon?: string;
        iconLabel?: string;
    }
    export class RadioButtonLineComponent extends React.Component<IRadioButtonLineComponentProps, {
        isSelected: boolean;
    }> {
        private _onSelectionChangedObserver;
        constructor(props: IRadioButtonLineComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        onChange(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface ISliderLineComponentProps {
        label: string;
        target?: any;
        propertyName?: string;
        minimum: number;
        maximum: number;
        step: number;
        directValue?: number;
        useEuler?: boolean;
        onChange?: (value: number) => void;
        onInput?: (value: number) => void;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        decimalCount?: number;
        margin?: boolean;
        icon?: string;
        iconLabel?: string;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        unit?: React.ReactNode;
    }
    export class SliderLineComponent extends React.Component<ISliderLineComponentProps, {
        value: number;
    }> {
        private _localChange;
        constructor(props: ISliderLineComponentProps);
        shouldComponentUpdate(nextProps: ISliderLineComponentProps, nextState: {
            value: number;
        }): boolean;
        onChange(newValueString: any): void;
        onInput(newValueString: any): void;
        prepareDataToRead(value: number): number;
        onCopyClick(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export const conflictingValuesPlaceholder = "\u2014";
    /**
     *
     * @param targets a list of selected targets
     * @param onPropertyChangedObservable
     * @param getProperty
     * @returns a proxy object that can be passed as a target into the input
     */
    export function makeTargetsProxy<Type>(targets: Type[], onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>, getProperty?: (target: Type, property: keyof Type) => any): any;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface ITextInputLineComponentProps {
        label?: string;
        lockObject?: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        target?: any;
        propertyName?: string;
        value?: string;
        onChange?: (value: string) => void;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        icon?: string;
        iconLabel?: string;
        noUnderline?: boolean;
        numbersOnly?: boolean;
        delayInput?: boolean;
        arrows?: boolean;
        arrowsIncrement?: (amount: number) => void;
        step?: number;
        numeric?: boolean;
        roundValues?: boolean;
        min?: number;
        max?: number;
        placeholder?: string;
        unit?: React.ReactNode;
        validator?: (value: string) => boolean;
        multilines?: boolean;
        throttlePropertyChangedNotification?: boolean;
        throttlePropertyChangedNotificationDelay?: number;
        disabled?: boolean;
    }
    export class TextInputLineComponent extends React.Component<ITextInputLineComponentProps, {
        value: string;
        dragging: boolean;
    }> {
        private _localChange;
        constructor(props: ITextInputLineComponentProps);
        componentWillUnmount(): void;
        shouldComponentUpdate(nextProps: ITextInputLineComponentProps, nextState: {
            value: string;
            dragging: boolean;
        }): boolean;
        raiseOnPropertyChanged(newValue: string, previousValue: string): void;
        getCurrentNumericValue(value: string): number;
        updateValue(value: string, valueToValidate?: string): void;
        incrementValue(amount: number): void;
        onKeyDown(event: React.KeyboardEvent): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface ITextLineComponentProps {
        label?: string;
        value?: string;
        color?: string;
        underline?: boolean;
        onLink?: () => void;
        url?: string;
        ignoreValue?: boolean;
        additionalClass?: string;
        icon?: string;
        iconLabel?: string;
        tooltip?: string;
    }
    export class TextLineComponent extends React.Component<ITextLineComponentProps> {
        constructor(props: ITextLineComponentProps);
        onLink(): void;
        renderContent(): import("react/jsx-runtime").JSX.Element | null;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IUnitButtonProps {
        unit: string;
        locked?: boolean;
        onClick?: (unit: string) => void;
    }
    export function UnitButton(props: IUnitButtonProps): import("react/jsx-runtime").JSX.Element;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IValueLineComponentProps {
        label: string;
        value: number;
        color?: string;
        fractionDigits?: number;
        units?: string;
        icon?: string;
        iconLabel?: string;
    }
    export class ValueLineComponent extends React.Component<IValueLineComponentProps> {
        constructor(props: IValueLineComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IVector2LineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        step?: number;
        onChange?: (newvalue: Vector2) => void;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        icon?: string;
        iconLabel?: string;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
    }
    export class Vector2LineComponent extends React.Component<IVector2LineComponentProps, {
        isExpanded: boolean;
        value: Vector2;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: IVector2LineComponentProps);
        shouldComponentUpdate(nextProps: IVector2LineComponentProps, nextState: {
            isExpanded: boolean;
            value: Vector2;
        }): boolean;
        switchExpandState(): void;
        raiseOnPropertyChanged(previousValue: Vector2): void;
        updateStateX(value: number): void;
        updateStateY(value: number): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IVector3LineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        step?: number;
        onChange?: (newvalue: Vector3) => void;
        useEuler?: boolean;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        noSlider?: boolean;
        icon?: string;
        iconLabel?: string;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
    }
    export class Vector3LineComponent extends React.Component<IVector3LineComponentProps, {
        isExpanded: boolean;
        value: Vector3;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: IVector3LineComponentProps);
        getCurrentValue(): any;
        shouldComponentUpdate(nextProps: IVector3LineComponentProps, nextState: {
            isExpanded: boolean;
            value: Vector3;
        }): boolean;
        switchExpandState(): void;
        raiseOnPropertyChanged(previousValue: Vector3): void;
        updateVector3(): void;
        updateStateX(value: number): void;
        updateStateY(value: number): void;
        updateStateZ(value: number): void;
        onCopyClick(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IVector4LineComponentProps {
        label: string;
        target?: any;
        propertyName?: string;
        step?: number;
        onChange?: (newvalue: Vector4) => void;
        useEuler?: boolean;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
        icon?: string;
        iconLabel?: string;
        value?: Vector4;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
    }
    export class Vector4LineComponent extends React.Component<IVector4LineComponentProps, {
        isExpanded: boolean;
        value: Vector4;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: IVector4LineComponentProps);
        getCurrentValue(): any;
        shouldComponentUpdate(nextProps: IVector4LineComponentProps, nextState: {
            isExpanded: boolean;
            value: Vector4;
        }): boolean;
        switchExpandState(): void;
        raiseOnPropertyChanged(previousValue: Vector4): void;
        updateVector4(): void;
        updateStateX(value: number): void;
        updateStateY(value: number): void;
        updateStateZ(value: number): void;
        updateStateW(value: number): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export class DisplayLedger {
        static RegisteredControls: {
            [key: string]: any;
        };
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export class FrameNodePort extends BABYLON.GuiEditor.SharedUIComponents.NodePort {
        portData: BABYLON.GuiEditor.SharedUIComponents.IPortData;
        node: BABYLON.GuiEditor.SharedUIComponents.GraphNode;
        private _parentFrameId;
        private _isInput;
        private _framePortPosition;
        private _framePortId;
        private _onFramePortPositionChangedObservable;
        get parentFrameId(): number;
        get onFramePortPositionChangedObservable(): Observable<FrameNodePort>;
        get isInput(): boolean;
        get framePortId(): number;
        get framePortPosition(): BABYLON.GuiEditor.SharedUIComponents.FramePortPosition;
        set framePortPosition(position: BABYLON.GuiEditor.SharedUIComponents.FramePortPosition);
        constructor(portContainer: HTMLElement, portData: BABYLON.GuiEditor.SharedUIComponents.IPortData, node: BABYLON.GuiEditor.SharedUIComponents.GraphNode, stateManager: BABYLON.GuiEditor.SharedUIComponents.StateManager, isInput: boolean, framePortId: number, parentFrameId: number);
        static CreateFrameNodePortElement(portData: BABYLON.GuiEditor.SharedUIComponents.IPortData, node: BABYLON.GuiEditor.SharedUIComponents.GraphNode, root: HTMLElement, displayManager: Nullable<BABYLON.GuiEditor.SharedUIComponents.IDisplayManager>, stateManager: BABYLON.GuiEditor.SharedUIComponents.StateManager, isInput: boolean, framePortId: number, parentFrameId: number): FrameNodePort;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface IGraphCanvasComponentProps {
        stateManager: BABYLON.GuiEditor.SharedUIComponents.StateManager;
        onEmitNewNode: (nodeData: BABYLON.GuiEditor.SharedUIComponents.INodeData) => BABYLON.GuiEditor.SharedUIComponents.GraphNode;
    }
    export class GraphCanvasComponent extends React.Component<IGraphCanvasComponentProps> implements BABYLON.GuiEditor.SharedUIComponents.INodeContainer {
        static readonly NodeWidth = 100;
        private readonly _minZoom;
        private readonly _maxZoom;
        private _hostCanvasRef;
        private _hostCanvas;
        private _graphCanvasRef;
        private _graphCanvas;
        private _selectionContainerRef;
        private _selectionContainer;
        private _frameContainerRef;
        private _frameContainer;
        private _svgCanvasRef;
        private _svgCanvas;
        private _rootContainerRef;
        private _rootContainer;
        private _nodes;
        private _links;
        private _mouseStartPointX;
        private _mouseStartPointY;
        private _dropPointX;
        private _dropPointY;
        private _selectionStartX;
        private _selectionStartY;
        private _candidateLinkedHasMoved;
        private _x;
        private _y;
        private _zoom;
        private _selectedNodes;
        private _selectedLink;
        private _selectedPort;
        private _candidateLink;
        private _candidatePort;
        private _gridSize;
        private _selectionBox;
        private _selectedFrames;
        private _frameCandidate;
        private _frames;
        private _nodeDataContentList;
        private _altKeyIsPressed;
        private _multiKeyIsPressed;
        private _oldY;
        _frameIsMoving: boolean;
        _isLoading: boolean;
        _targetLinkCandidate: Nullable<BABYLON.GuiEditor.SharedUIComponents.NodeLink>;
        private _copiedNodes;
        private _copiedFrames;
        get gridSize(): number;
        set gridSize(value: number);
        get stateManager(): BABYLON.GuiEditor.SharedUIComponents.StateManager;
        get nodes(): BABYLON.GuiEditor.SharedUIComponents.GraphNode[];
        get links(): BABYLON.GuiEditor.SharedUIComponents.NodeLink[];
        get frames(): BABYLON.GuiEditor.SharedUIComponents.GraphFrame[];
        get zoom(): number;
        set zoom(value: number);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get selectedNodes(): BABYLON.GuiEditor.SharedUIComponents.GraphNode[];
        get selectedLink(): Nullable<BABYLON.GuiEditor.SharedUIComponents.NodeLink>;
        get selectedFrames(): BABYLON.GuiEditor.SharedUIComponents.GraphFrame[];
        get selectedPort(): Nullable<BABYLON.GuiEditor.SharedUIComponents.NodePort>;
        get canvasContainer(): HTMLDivElement;
        get hostCanvas(): HTMLDivElement;
        get svgCanvas(): HTMLElement;
        get selectionContainer(): HTMLDivElement;
        get frameContainer(): HTMLDivElement;
        private _selectedFrameAndNodesConflict;
        constructor(props: IGraphCanvasComponentProps);
        populateConnectedEntriesBeforeRemoval(item: BABYLON.GuiEditor.SharedUIComponents.GraphNode, items: BABYLON.GuiEditor.SharedUIComponents.GraphNode[], inputs: Nullable<BABYLON.GuiEditor.SharedUIComponents.IPortData>[], outputs: Nullable<BABYLON.GuiEditor.SharedUIComponents.IPortData>[]): void;
        automaticRewire(inputs: Nullable<BABYLON.GuiEditor.SharedUIComponents.IPortData>[], outputs: Nullable<BABYLON.GuiEditor.SharedUIComponents.IPortData>[], firstOnly?: boolean): void;
        smartAddOverLink(node: BABYLON.GuiEditor.SharedUIComponents.GraphNode, link: BABYLON.GuiEditor.SharedUIComponents.NodeLink): void;
        smartAddOverNode(node: BABYLON.GuiEditor.SharedUIComponents.GraphNode, source: BABYLON.GuiEditor.SharedUIComponents.GraphNode): void;
        deleteSelection(onRemove: (nodeData: BABYLON.GuiEditor.SharedUIComponents.INodeData) => void, autoReconnect?: boolean): void;
        handleKeyDown(evt: KeyboardEvent, onRemove: (nodeData: BABYLON.GuiEditor.SharedUIComponents.INodeData) => void, mouseLocationX: number, mouseLocationY: number, dataGenerator: (nodeData: BABYLON.GuiEditor.SharedUIComponents.INodeData) => any, rootElement: HTMLDivElement): void;
        pasteSelection(copiedNodes: BABYLON.GuiEditor.SharedUIComponents.GraphNode[], currentX: number, currentY: number, dataGenerator: (nodeData: BABYLON.GuiEditor.SharedUIComponents.INodeData) => any, selectNew?: boolean): BABYLON.GuiEditor.SharedUIComponents.GraphNode[];
        reconnectNewNodes(nodeIndex: number, newNodes: BABYLON.GuiEditor.SharedUIComponents.GraphNode[], sourceNodes: BABYLON.GuiEditor.SharedUIComponents.GraphNode[], done: boolean[]): void;
        getCachedData(): any[];
        removeDataFromCache(data: any): void;
        createNodeFromObject(nodeData: BABYLON.GuiEditor.SharedUIComponents.INodeData, onNodeCreated: (data: any) => void, recursion?: boolean): BABYLON.GuiEditor.SharedUIComponents.GraphNode;
        getGridPosition(position: number, useCeil?: boolean): number;
        getGridPositionCeil(position: number): number;
        updateTransform(): void;
        onKeyUp(): void;
        findNodeFromData(data: any): BABYLON.GuiEditor.SharedUIComponents.GraphNode;
        reset(): void;
        connectPorts(pointA: BABYLON.GuiEditor.SharedUIComponents.IPortData, pointB: BABYLON.GuiEditor.SharedUIComponents.IPortData): void;
        removeLink(link: BABYLON.GuiEditor.SharedUIComponents.NodeLink): void;
        appendNode(nodeData: BABYLON.GuiEditor.SharedUIComponents.INodeData): BABYLON.GuiEditor.SharedUIComponents.GraphNode;
        distributeGraph(): void;
        componentDidMount(): void;
        onMove(evt: React.PointerEvent): void;
        onDown(evt: React.PointerEvent<HTMLElement>): void;
        onUp(evt: React.PointerEvent): void;
        onWheel(evt: React.WheelEvent): void;
        zoomToFit(): void;
        processCandidatePort(): void;
        connectNodes(nodeA: BABYLON.GuiEditor.SharedUIComponents.GraphNode, pointA: BABYLON.GuiEditor.SharedUIComponents.IPortData, nodeB: BABYLON.GuiEditor.SharedUIComponents.GraphNode, pointB: BABYLON.GuiEditor.SharedUIComponents.IPortData): void;
        drop(newNode: BABYLON.GuiEditor.SharedUIComponents.GraphNode, targetX: number, targetY: number, offsetX: number, offsetY: number): void;
        processEditorData(editorData: BABYLON.GuiEditor.SharedUIComponents.IEditorData): void;
        reOrganize(editorData?: Nullable<BABYLON.GuiEditor.SharedUIComponents.IEditorData>, isImportingAFrame?: boolean): void;
        addFrame(frameData: BABYLON.GuiEditor.SharedUIComponents.IFrameData): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export enum FramePortPosition {
        Top = 0,
        Middle = 1,
        Bottom = 2
    }
    export class GraphFrame {
        private readonly _collapsedWidth;
        private static _FrameCounter;
        private static _FramePortCounter;
        private _name;
        private _color;
        private _x;
        private _y;
        private _gridAlignedX;
        private _gridAlignedY;
        private _width;
        private _height;
        element: HTMLDivElement;
        private _borderElement;
        private _headerElement;
        private _headerTextElement;
        private _headerCollapseElement;
        private _headerCloseElement;
        private _commentsElement;
        private _portContainer;
        private _outputPortContainer;
        private _inputPortContainer;
        private _nodes;
        private _ownerCanvas;
        private _mouseStartPointX;
        private _mouseStartPointY;
        private _onSelectionChangedObserver;
        private _onGraphNodeRemovalObserver;
        private _onExposePortOnFrameObserver;
        private _onNodeLinkDisposedObservers;
        private _isCollapsed;
        private _frameInPorts;
        private _frameOutPorts;
        private _controlledPorts;
        private _exposedInPorts;
        private _exposedOutPorts;
        private _id;
        private _comments;
        private _frameIsResizing;
        private _resizingDirection;
        private _minFrameHeight;
        private _minFrameWidth;
        private _mouseXLimit;
        onExpandStateChanged: Observable<GraphFrame>;
        private readonly _closeSVG;
        private readonly _expandSVG;
        private readonly _collapseSVG;
        get id(): number;
        get isCollapsed(): boolean;
        private _createInputPort;
        private _markFramePortPositions;
        private _createFramePorts;
        private _removePortFromExposedWithNode;
        private _removePortFromExposedWithLink;
        private _createInputPorts;
        private _createOutputPorts;
        redrawFramePorts(): void;
        set isCollapsed(value: boolean);
        get nodes(): BABYLON.GuiEditor.SharedUIComponents.GraphNode[];
        get ports(): BABYLON.GuiEditor.SharedUIComponents.FrameNodePort[];
        get name(): string;
        set name(value: string);
        get color(): Color3;
        set color(value: Color3);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get width(): number;
        set width(value: number);
        get height(): number;
        set height(value: number);
        get comments(): string;
        set comments(comments: string);
        constructor(candidate: Nullable<HTMLDivElement>, canvas: BABYLON.GuiEditor.SharedUIComponents.GraphCanvasComponent, doNotCaptureNodes?: boolean);
        refresh(): void;
        addNode(node: BABYLON.GuiEditor.SharedUIComponents.GraphNode): void;
        removeNode(node: BABYLON.GuiEditor.SharedUIComponents.GraphNode): void;
        syncNode(node: BABYLON.GuiEditor.SharedUIComponents.GraphNode): void;
        cleanAccumulation(): void;
        private _onDown;
        move(newX: number, newY: number, align?: boolean): void;
        private _onUp;
        _moveFrame(offsetX: number, offsetY: number): void;
        private _onMove;
        moveFramePortUp(nodePort: BABYLON.GuiEditor.SharedUIComponents.FrameNodePort): void;
        private _movePortUp;
        moveFramePortDown(nodePort: BABYLON.GuiEditor.SharedUIComponents.FrameNodePort): void;
        private _movePortDown;
        private _initResizing;
        private _cleanUpResizing;
        private _updateMinHeightWithComments;
        private _isResizingTop;
        private _isResizingRight;
        private _isResizingBottom;
        private _isResizingLeft;
        private _onRightHandlePointerDown;
        private _onRightHandlePointerMove;
        private _moveRightHandle;
        private _onRightHandlePointerUp;
        private _onBottomHandlePointerDown;
        private _onBottomHandlePointerMove;
        private _moveBottomHandle;
        private _onBottomHandlePointerUp;
        private _onLeftHandlePointerDown;
        private _onLeftHandlePointerMove;
        private _moveLeftHandle;
        private _onLeftHandlePointerUp;
        private _onTopHandlePointerDown;
        private _onTopHandlePointerMove;
        private _moveTopHandle;
        private _onTopHandlePointerUp;
        private _onTopRightHandlePointerDown;
        private _onTopRightHandlePointerMove;
        private _moveTopRightHandle;
        private _onTopRightHandlePointerUp;
        private _onBottomRightHandlePointerDown;
        private _onBottomRightHandlePointerMove;
        private _moveBottomRightHandle;
        private _onBottomRightHandlePointerUp;
        private _onBottomLeftHandlePointerDown;
        private _onBottomLeftHandlePointerMove;
        private _moveBottomLeftHandle;
        private _onBottomLeftHandlePointerUp;
        private _onTopLeftHandlePointerDown;
        private _onTopLeftHandlePointerMove;
        private _moveTopLeftHandle;
        private _onTopLeftHandlePointerUp;
        private _expandLeft;
        private _expandTop;
        private _expandRight;
        private _expandBottom;
        dispose(): void;
        private _serializePortData;
        serialize(saveCollapsedState: boolean): BABYLON.GuiEditor.SharedUIComponents.IFrameData;
        export(): void;
        adjustPorts(): void;
        static Parse(serializationData: BABYLON.GuiEditor.SharedUIComponents.IFrameData, canvas: BABYLON.GuiEditor.SharedUIComponents.GraphCanvasComponent, map?: {
            [key: number]: number;
        }): GraphFrame;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /// <reference types="react" />
    export class GraphNode {
        content: BABYLON.GuiEditor.SharedUIComponents.INodeData;
        private _visual;
        private _headerContainer;
        private _headerIcon;
        private _headerIconImg;
        private _header;
        private _connections;
        private _inputsContainer;
        private _outputsContainer;
        private _content;
        private _comments;
        private _executionTime;
        private _selectionBorder;
        private _inputPorts;
        private _outputPorts;
        private _links;
        private _x;
        private _y;
        private _gridAlignedX;
        private _gridAlignedY;
        private _mouseStartPointX;
        private _mouseStartPointY;
        private _stateManager;
        private _onSelectionChangedObserver;
        private _onSelectionBoxMovedObserver;
        private _onFrameCreatedObserver;
        private _onUpdateRequiredObserver;
        private _onHighlightNodeObserver;
        private _ownerCanvas;
        private _isSelected;
        private _displayManager;
        private _isVisible;
        private _enclosingFrameId;
        addClassToVisual(className: string): void;
        removeClassFromVisual(className: string): void;
        get isVisible(): boolean;
        set isVisible(value: boolean);
        private _upateNodePortNames;
        get outputPorts(): BABYLON.GuiEditor.SharedUIComponents.NodePort[];
        get inputPorts(): BABYLON.GuiEditor.SharedUIComponents.NodePort[];
        get links(): BABYLON.GuiEditor.SharedUIComponents.NodeLink[];
        get gridAlignedX(): number;
        get gridAlignedY(): number;
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get width(): number;
        get height(): number;
        get id(): number;
        get name(): string;
        get isSelected(): boolean;
        get enclosingFrameId(): number;
        set enclosingFrameId(value: number);
        set isSelected(value: boolean);
        setIsSelected(value: boolean, marqueeSelection: boolean): void;
        constructor(content: BABYLON.GuiEditor.SharedUIComponents.INodeData, stateManager: BABYLON.GuiEditor.SharedUIComponents.StateManager);
        isOverlappingFrame(frame: BABYLON.GuiEditor.SharedUIComponents.GraphFrame): boolean;
        getPortForPortData(portData: BABYLON.GuiEditor.SharedUIComponents.IPortData): BABYLON.GuiEditor.SharedUIComponents.NodePort | null;
        getPortDataForPortDataContent(data: any): BABYLON.GuiEditor.SharedUIComponents.IPortData | null;
        getLinksForPortDataContent(data: any): BABYLON.GuiEditor.SharedUIComponents.NodeLink[];
        getLinksForPortData(portData: BABYLON.GuiEditor.SharedUIComponents.IPortData): BABYLON.GuiEditor.SharedUIComponents.NodeLink[];
        private _refreshFrames;
        _refreshLinks(): void;
        refresh(): void;
        private _onDown;
        cleanAccumulation(useCeil?: boolean): void;
        private _onUp;
        private _onMove;
        renderProperties(): Nullable<JSX.Element>;
        appendVisual(root: HTMLDivElement, owner: BABYLON.GuiEditor.SharedUIComponents.GraphCanvasComponent): void;
        dispose(): void;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface VisualContentDescription {
        [key: string]: HTMLElement;
    }
    export interface IDisplayManager {
        getHeaderClass(data: BABYLON.GuiEditor.SharedUIComponents.INodeData): string;
        shouldDisplayPortLabels(data: BABYLON.GuiEditor.SharedUIComponents.IPortData): boolean;
        updatePreviewContent(data: BABYLON.GuiEditor.SharedUIComponents.INodeData, contentArea: HTMLDivElement): void;
        updateFullVisualContent?(data: BABYLON.GuiEditor.SharedUIComponents.INodeData, visualContent: VisualContentDescription): void;
        getBackgroundColor(data: BABYLON.GuiEditor.SharedUIComponents.INodeData): string;
        getHeaderText(data: BABYLON.GuiEditor.SharedUIComponents.INodeData): string;
        onSelectionChanged?(data: BABYLON.GuiEditor.SharedUIComponents.INodeData, selectedData: Nullable<BABYLON.GuiEditor.SharedUIComponents.INodeData>, manager: BABYLON.GuiEditor.SharedUIComponents.StateManager): void;
        onDispose?(nodeData: BABYLON.GuiEditor.SharedUIComponents.INodeData, manager: BABYLON.GuiEditor.SharedUIComponents.StateManager): void;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface INodeContainer {
        nodes: BABYLON.GuiEditor.SharedUIComponents.GraphNode[];
        appendNode(data: BABYLON.GuiEditor.SharedUIComponents.INodeData): BABYLON.GuiEditor.SharedUIComponents.GraphNode;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface INodeData {
        data: any;
        name: string;
        uniqueId: number;
        isInput: boolean;
        comments: string;
        executionTime?: number;
        refreshCallback?: () => void;
        prepareHeaderIcon: (iconDiv: HTMLDivElement, img: HTMLImageElement) => void;
        getClassName: () => string;
        dispose: () => void;
        getPortByName: (name: string) => Nullable<BABYLON.GuiEditor.SharedUIComponents.IPortData>;
        inputs: BABYLON.GuiEditor.SharedUIComponents.IPortData[];
        outputs: BABYLON.GuiEditor.SharedUIComponents.IPortData[];
        invisibleEndpoints?: Nullable<any[]>;
        isConnectedToOutput?: () => boolean;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface INodeLocationInfo {
        blockId: number;
        x: number;
        y: number;
    }
    export interface IFrameData {
        x: number;
        y: number;
        width: number;
        height: number;
        color: number[];
        name: string;
        isCollapsed: boolean;
        blocks: number[];
        comments: string;
    }
    export interface IEditorData {
        locations: INodeLocationInfo[];
        x: number;
        y: number;
        zoom: number;
        frames?: IFrameData[];
        map?: {
            [key: number]: number;
        };
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export enum PortDataDirection {
        /** Input */
        Input = 0,
        /** Output */
        Output = 1
    }
    export interface IPortData {
        data: any;
        name: string;
        internalName: string;
        isExposedOnFrame: boolean;
        exposedPortPosition: number;
        isConnected: boolean;
        direction: PortDataDirection;
        ownerData: any;
        connectedPort: Nullable<IPortData>;
        needDualDirectionValidation: boolean;
        hasEndpoints: boolean;
        endpoints: Nullable<IPortData[]>;
        updateDisplayName: (newName: string) => void;
        canConnectTo: (port: IPortData) => boolean;
        connectTo: (port: IPortData) => void;
        disconnectFrom: (port: IPortData) => void;
        checkCompatibilityState(port: IPortData): number;
        getCompatibilityIssueMessage(issue: number, targetNode: BABYLON.GuiEditor.SharedUIComponents.GraphNode, targetPort: IPortData): string;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface IPropertyComponentProps {
        stateManager: BABYLON.GuiEditor.SharedUIComponents.StateManager;
        nodeData: BABYLON.GuiEditor.SharedUIComponents.INodeData;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface ISelectionChangedOptions {
        selection: Nullable<BABYLON.GuiEditor.SharedUIComponents.GraphNode | BABYLON.GuiEditor.SharedUIComponents.NodeLink | BABYLON.GuiEditor.SharedUIComponents.GraphFrame | BABYLON.GuiEditor.SharedUIComponents.NodePort | BABYLON.GuiEditor.SharedUIComponents.FramePortData>;
        forceKeepSelection?: boolean;
        marqueeSelection?: boolean;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export class NodeLedger {
        static RegisteredNodeNames: string[];
        static NameFormatter: (name: string) => string;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export class NodeLink {
        private _graphCanvas;
        private _portA;
        private _portB?;
        private _nodeA;
        private _nodeB?;
        private _path;
        private _selectionPath;
        private _onSelectionChangedObserver;
        private _isVisible;
        private _isTargetCandidate;
        onDisposedObservable: Observable<NodeLink>;
        get isTargetCandidate(): boolean;
        set isTargetCandidate(value: boolean);
        get isVisible(): boolean;
        set isVisible(value: boolean);
        get portA(): BABYLON.GuiEditor.SharedUIComponents.FrameNodePort | BABYLON.GuiEditor.SharedUIComponents.NodePort;
        get portB(): BABYLON.GuiEditor.SharedUIComponents.FrameNodePort | BABYLON.GuiEditor.SharedUIComponents.NodePort | undefined;
        get nodeA(): BABYLON.GuiEditor.SharedUIComponents.GraphNode;
        get nodeB(): BABYLON.GuiEditor.SharedUIComponents.GraphNode | undefined;
        intersectsWith(rect: DOMRect): boolean;
        update(endX?: number, endY?: number, straight?: boolean): void;
        constructor(graphCanvas: BABYLON.GuiEditor.SharedUIComponents.GraphCanvasComponent, portA: BABYLON.GuiEditor.SharedUIComponents.NodePort, nodeA: BABYLON.GuiEditor.SharedUIComponents.GraphNode, portB?: BABYLON.GuiEditor.SharedUIComponents.NodePort, nodeB?: BABYLON.GuiEditor.SharedUIComponents.GraphNode);
        onClick(evt: MouseEvent): void;
        dispose(notify?: boolean): void;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export class NodePort {
        portData: BABYLON.GuiEditor.SharedUIComponents.IPortData;
        node: BABYLON.GuiEditor.SharedUIComponents.GraphNode;
        protected _element: HTMLDivElement;
        protected _img: HTMLImageElement;
        protected _pip: HTMLDivElement;
        protected _stateManager: BABYLON.GuiEditor.SharedUIComponents.StateManager;
        protected _portLabelElement: Element;
        protected _onCandidateLinkMovedObserver: Nullable<Observer<Nullable<Vector2>>>;
        protected _onSelectionChangedObserver: Nullable<Observer<Nullable<BABYLON.GuiEditor.SharedUIComponents.ISelectionChangedOptions>>>;
        protected _exposedOnFrame: boolean;
        delegatedPort: Nullable<BABYLON.GuiEditor.SharedUIComponents.FrameNodePort>;
        get element(): HTMLDivElement;
        get portName(): string;
        set portName(newName: string);
        get disabled(): boolean;
        hasLabel(): boolean;
        get exposedOnFrame(): boolean;
        set exposedOnFrame(value: boolean);
        get exposedPortPosition(): number;
        set exposedPortPosition(value: number);
        private _isConnectedToNodeOutsideOfFrame;
        refresh(): void;
        constructor(portContainer: HTMLElement, portData: BABYLON.GuiEditor.SharedUIComponents.IPortData, node: BABYLON.GuiEditor.SharedUIComponents.GraphNode, stateManager: BABYLON.GuiEditor.SharedUIComponents.StateManager);
        dispose(): void;
        static CreatePortElement(portData: BABYLON.GuiEditor.SharedUIComponents.IPortData, node: BABYLON.GuiEditor.SharedUIComponents.GraphNode, root: HTMLElement, displayManager: Nullable<BABYLON.GuiEditor.SharedUIComponents.IDisplayManager>, stateManager: BABYLON.GuiEditor.SharedUIComponents.StateManager): NodePort;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export class PropertyLedger {
        static DefaultControl: React.ComponentClass<BABYLON.GuiEditor.SharedUIComponents.IPropertyComponentProps>;
        static RegisteredControls: {
            [key: string]: React.ComponentClass<BABYLON.GuiEditor.SharedUIComponents.IPropertyComponentProps>;
        };
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export interface ISearchBoxComponentProps {
        stateManager: BABYLON.GuiEditor.SharedUIComponents.StateManager;
    }
    /**
     * The search box component.
     */
    export class SearchBoxComponent extends React.Component<ISearchBoxComponentProps, {
        isVisible: boolean;
        filter: string;
        selectedIndex: number;
    }> {
        private _handleEscKey;
        private _targetX;
        private _targetY;
        private _nodes;
        constructor(props: ISearchBoxComponentProps);
        hide(): void;
        onFilterChange(evt: React.ChangeEvent<HTMLInputElement>): void;
        onNewNodeRequested(name: string): void;
        onKeyDown(evt: React.KeyboardEvent): void;
        render(): import("react/jsx-runtime").JSX.Element | null;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export class StateManager {
        data: any;
        hostDocument: Document;
        lockObject: any;
        modalIsDisplayed: boolean;
        onSearchBoxRequiredObservable: Observable<{
            x: number;
            y: number;
        }>;
        onSelectionChangedObservable: Observable<Nullable<BABYLON.GuiEditor.SharedUIComponents.ISelectionChangedOptions>>;
        onFrameCreatedObservable: Observable<BABYLON.GuiEditor.SharedUIComponents.GraphFrame>;
        onUpdateRequiredObservable: Observable<any>;
        onGraphNodeRemovalObservable: Observable<BABYLON.GuiEditor.SharedUIComponents.GraphNode>;
        onSelectionBoxMoved: Observable<DOMRect | ClientRect>;
        onCandidateLinkMoved: Observable<Nullable<Vector2>>;
        onCandidatePortSelectedObservable: Observable<Nullable<BABYLON.GuiEditor.SharedUIComponents.FrameNodePort | BABYLON.GuiEditor.SharedUIComponents.NodePort>>;
        onNewNodeCreatedObservable: Observable<BABYLON.GuiEditor.SharedUIComponents.GraphNode>;
        onRebuildRequiredObservable: Observable<void>;
        onErrorMessageDialogRequiredObservable: Observable<string>;
        onExposePortOnFrameObservable: Observable<BABYLON.GuiEditor.SharedUIComponents.GraphNode>;
        onGridSizeChanged: Observable<void>;
        onNewBlockRequiredObservable: Observable<{
            type: string;
            targetX: number;
            targetY: number;
            needRepositioning?: boolean | undefined;
            smartAdd?: boolean | undefined;
        }>;
        onHighlightNodeObservable: Observable<{
            data: any;
            active: boolean;
        }>;
        exportData: (data: any, frame?: Nullable<BABYLON.GuiEditor.SharedUIComponents.GraphFrame>) => string;
        isElbowConnectionAllowed: (nodeA: BABYLON.GuiEditor.SharedUIComponents.FrameNodePort | BABYLON.GuiEditor.SharedUIComponents.NodePort, nodeB: BABYLON.GuiEditor.SharedUIComponents.FrameNodePort | BABYLON.GuiEditor.SharedUIComponents.NodePort) => boolean;
        isDebugConnectionAllowed: (nodeA: BABYLON.GuiEditor.SharedUIComponents.FrameNodePort | BABYLON.GuiEditor.SharedUIComponents.NodePort, nodeB: BABYLON.GuiEditor.SharedUIComponents.FrameNodePort | BABYLON.GuiEditor.SharedUIComponents.NodePort) => boolean;
        applyNodePortDesign: (data: BABYLON.GuiEditor.SharedUIComponents.IPortData, element: HTMLElement, img: HTMLImageElement, pip: HTMLDivElement) => void;
        storeEditorData: (serializationObject: any, frame?: Nullable<BABYLON.GuiEditor.SharedUIComponents.GraphFrame>) => void;
        getEditorDataMap: () => {
            [key: number]: number;
        };
        createDefaultInputData: (rootData: any, portData: BABYLON.GuiEditor.SharedUIComponents.IPortData, nodeContainer: BABYLON.GuiEditor.SharedUIComponents.INodeContainer) => Nullable<{
            data: BABYLON.GuiEditor.SharedUIComponents.INodeData;
            name: string;
        }>;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export const IsFramePortData: (variableToCheck: any) => variableToCheck is BABYLON.GuiEditor.SharedUIComponents.FramePortData;
    export const RefreshNode: (node: BABYLON.GuiEditor.SharedUIComponents.GraphNode, visitedNodes?: Set<BABYLON.GuiEditor.SharedUIComponents.GraphNode>, visitedLinks?: Set<BABYLON.GuiEditor.SharedUIComponents.NodeLink>, canvas?: BABYLON.GuiEditor.SharedUIComponents.GraphCanvasComponent) => void;



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export class TypeLedger {
        static PortDataBuilder: (port: BABYLON.GuiEditor.SharedUIComponents.NodePort, nodeContainer: BABYLON.GuiEditor.SharedUIComponents.INodeContainer) => BABYLON.GuiEditor.SharedUIComponents.IPortData;
        static NodeDataBuilder: (data: any, nodeContainer: BABYLON.GuiEditor.SharedUIComponents.INodeContainer) => BABYLON.GuiEditor.SharedUIComponents.INodeData;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export type FramePortData = {
        frame: BABYLON.GuiEditor.SharedUIComponents.GraphFrame;
        port: BABYLON.GuiEditor.SharedUIComponents.FrameNodePort;
    };



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export class PropertyChangedEvent {
        object: any;
        property: string;
        value: any;
        initialValue: any;
        allowNullValue?: boolean;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        export class StringTools {
        private static _SaveAs;
        private static _Click;
        /**
         * Download a string into a file that will be saved locally by the browser
         * @param document
         * @param content defines the string to download locally as a file
         * @param filename
         */
        static DownloadAsFile(document: HTMLDocument, content: string, filename: string): void;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface ICheckboxPropertyGridComponentProps {
        checkbox: BABYLON.GUI.Checkbox;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class CheckboxPropertyGridComponent extends React.Component<ICheckboxPropertyGridComponentProps> {
        constructor(props: ICheckboxPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IColorPickerPropertyGridComponentProps {
        colorPicker: BABYLON.GUI.ColorPicker;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ColorPickerPropertyGridComponent extends React.Component<IColorPickerPropertyGridComponentProps> {
        constructor(props: IColorPickerPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface ICommonControlPropertyGridComponentProps {
        controls?: BABYLON.GUI.Control[];
        control?: BABYLON.GUI.Control;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class CommonControlPropertyGridComponent extends React.Component<ICommonControlPropertyGridComponentProps> {
        constructor(props: ICommonControlPropertyGridComponentProps);
        renderGridInformation(control: BABYLON.GUI.Control): import("react/jsx-runtime").JSX.Element | null;
        render(): import("react/jsx-runtime").JSX.Element | undefined;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IControlPropertyGridComponentProps {
        control: BABYLON.GUI.Control;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ControlPropertyGridComponent extends React.Component<IControlPropertyGridComponentProps> {
        constructor(props: IControlPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IEllipsePropertyGridComponentProps {
        ellipse: BABYLON.GUI.Ellipse;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class EllipsePropertyGridComponent extends React.Component<IEllipsePropertyGridComponentProps> {
        constructor(props: IEllipsePropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IGridPropertyGridComponentProps {
        grid: BABYLON.GUI.Grid;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class GridPropertyGridComponent extends React.Component<IGridPropertyGridComponentProps> {
        constructor(props: IGridPropertyGridComponentProps);
        renderRows(): import("react/jsx-runtime").JSX.Element[];
        renderColumns(): import("react/jsx-runtime").JSX.Element[];
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IImageBasedSliderPropertyGridComponentProps {
        imageBasedSlider: BABYLON.GUI.ImageBasedSlider;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ImageBasedSliderPropertyGridComponent extends React.Component<IImageBasedSliderPropertyGridComponentProps> {
        constructor(props: IImageBasedSliderPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IImagePropertyGridComponentProps {
        image: BABYLON.GUI.Image;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ImagePropertyGridComponent extends React.Component<IImagePropertyGridComponentProps> {
        constructor(props: IImagePropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IInputTextPropertyGridComponentProps {
        inputText: BABYLON.GUI.InputText;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class InputTextPropertyGridComponent extends React.Component<IInputTextPropertyGridComponentProps> {
        constructor(props: IInputTextPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface ILinePropertyGridComponentProps {
        line: BABYLON.GUI.Line;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class LinePropertyGridComponent extends React.Component<ILinePropertyGridComponentProps> {
        constructor(props: ILinePropertyGridComponentProps);
        onDashChange(value: string): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IRadioButtonPropertyGridComponentProps {
        radioButtons: BABYLON.GUI.RadioButton[];
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class RadioButtonPropertyGridComponent extends React.Component<IRadioButtonPropertyGridComponentProps> {
        constructor(props: IRadioButtonPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IRectanglePropertyGridComponentProps {
        rectangle: BABYLON.GUI.Rectangle;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class RectanglePropertyGridComponent extends React.Component<IRectanglePropertyGridComponentProps> {
        constructor(props: IRectanglePropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IScrollViewerPropertyGridComponentProps {
        scrollViewer: BABYLON.GUI.ScrollViewer;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ScrollViewerPropertyGridComponent extends React.Component<IScrollViewerPropertyGridComponentProps> {
        constructor(props: IScrollViewerPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface ISliderPropertyGridComponentProps {
        slider: BABYLON.GUI.Slider;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class SliderPropertyGridComponent extends React.Component<ISliderPropertyGridComponentProps> {
        constructor(props: ISliderPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface IStackPanelPropertyGridComponentProps {
        stackPanel: BABYLON.GUI.StackPanel;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class StackPanelPropertyGridComponent extends React.Component<IStackPanelPropertyGridComponentProps> {
        constructor(props: IStackPanelPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        interface ITextBlockPropertyGridComponentProps {
        textBlock: BABYLON.GUI.TextBlock;
        lockObject: BABYLON.GuiEditor.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: Observable<BABYLON.GuiEditor.SharedUIComponents.PropertyChangedEvent>;
    }
    export class TextBlockPropertyGridComponent extends React.Component<ITextBlockPropertyGridComponentProps> {
        constructor(props: ITextBlockPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module BABYLON {

}
declare module BABYLON.GuiEditor.SharedUIComponents {
        /**
     * Class used to provide lock mechanism
     */
    export class LockObject {
        /**
         * Gets or set if the lock is engaged
         */
        lock: boolean;
    }



}
declare module BABYLON {

}


