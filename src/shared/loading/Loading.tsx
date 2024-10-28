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