interface Props {
  preList: any[];
  list: any[];
  isNext: boolean;
}
export const handleLoadMoreData = ({
  preList,
  list,
  isNext,
}: Props) => {

  if (isNext) {
    return preList.concat(list);
  } else {
    return preList;
  }
};
