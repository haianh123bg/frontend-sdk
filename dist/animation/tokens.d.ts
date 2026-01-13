export declare const motionDurations: {
    readonly instant: 0.12;
    readonly fast: 0.24;
    readonly normal: 0.36;
    readonly slow: 0.55;
};
export declare const motionEasings: {
    readonly standard: readonly [0.2, 0.7, 0.4, 1];
    readonly emphasized: readonly [0.4, 0, 0.2, 1];
    readonly bounce: readonly [0.34, 1.56, 0.64, 1];
};
export declare const motionSprings: {
    readonly gentle: {
        readonly type: "spring";
        readonly stiffness: 200;
        readonly damping: 26;
    };
    readonly snappy: {
        readonly type: "spring";
        readonly stiffness: 320;
        readonly damping: 25;
    };
    readonly loose: {
        readonly type: "spring";
        readonly stiffness: 140;
        readonly damping: 20;
    };
};
