import { useCallback, useEffect, useRef } from 'react';
import qs from 'qs';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Categories } from '../components/Categories';
import { Sort, list } from '../components/Sort';
import { PizzaBlock } from '../components/Pizzablock/PizzaBlock';
import { Skeleton } from '../components/Pizzablock/Skeleton';
import { Pagination } from '../components/Pagination';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import {
  fetchPizzas,
  SearchPizzaParams,
  selectPizzaData,
} from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );

    window.scrollTo(0, 0);
  };

  // Если изменили параметры и был первый рендер
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       sortProperty: sort.sortProperty,
  //       currentPage,
  //     };

  //     const queryString = qs.stringify(params, { skipNulls: true });

  //     navigate(`/?${queryString}`);
  //   }

  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({}));
  //   }
  // }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // Парсим параметры при первом рендере
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1),
  //     ) as unknown as SearchPizzaParams;
  //     const sort = list.find((obj) => obj.sortProperty === params.sortBy);
  //     dispatch(
  //       setFilters({
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         searchValue: params.search,
  //         sort: sort || list[0],
  //       }),
  //     );
  //   }
  //   isMounted.current = true;
  // }, []);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeleton = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Something went wrong 😕</h2>
          <p>Sorry, we couldn't get pizzas, try it again please.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeleton : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
