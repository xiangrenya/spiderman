import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Table } from 'antd';
import { getMovies } from './reduck';
import styles from './index.less';

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        defaultPageSize: 20,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
      },
    };
    this.columns = [
      {
        title: '电影',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => <a href={record.source} target="_blank" rel="noopener noreferrer">{text}</a>,
      },
      {
        title: '操作',
        dataIndex: '_id',
        key: '_id',
        render: (text, record) => (
          <a href={record.href}><Button type="primary" size="small" icon="cloud-download" /></a>
        ),
      },
    ];
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getMovies({
      page: 1,
      perPage: 20,
    }));
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const { total } = this.props;
    const { pagination } = this.state;
    if (total !== prevProps.total) {
      this.setState({
        pagination: {
          ...pagination,
          total,
        },
      });
    }
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;
    this.setState(prevState => ({
      pagination: {
        ...prevState.pagination,
        current: pagination.current,
      },
    }));
    dispatch(getMovies({
      page: pagination.current,
      perPage: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    }));
  }

  render() {
    const { movies, loading } = this.props;
    const { pagination } = this.state;
    return (
      <div className={styles['movie-container']}>
        <Table
          size="small"
          rowKey={record => record._id}
          columns={this.columns}
          expandedRowRender={record => (
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: record.description }}
            />
          )}
          dataSource={movies}
          pagination={pagination}
          loading={loading}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

Movie.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    href: PropTypes.string,
    source: PropTypes.string,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  movies: state.movie.list,
  loading: state.common.showListSpin,
  total: state.movie.total,
});

export default connect(mapStateToProps)(Movie);
