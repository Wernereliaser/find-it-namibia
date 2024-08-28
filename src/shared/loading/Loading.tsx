interface LoadingProps {
  fullHeight?: boolean;
}

export const Loading = (props: LoadingProps) => {
  return (
    <div className={props.fullHeight ? "loader full-width-loader" : "loader"}>
      <div className="adb-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export const LoadingEllipsis = (props: LoadingProps) => {
  return (
    <div className={props.fullHeight ? "loader full-width-loader" : "loader"}>
      <div className="adb-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export const Loader = () => {
  return (
    <div className="uk-margin-small-left" data-uk-spinner="ratio: .5"></div>
  )
}