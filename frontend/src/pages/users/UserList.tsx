import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import type { User, PaginationMetadata } from '../../types';
import Loading from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import BottomNav from '../../components/common/BottomNav';

const UserList = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Pagination state
  const [pagination, setPagination] = useState<PaginationMetadata>({
    page: 1,
    limit: 10,
    total: 0,
    total_pages: 0
  });
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'santri' | 'pengajar'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'aktif' | 'nonaktif' | 'alumni'>('all');

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, statusFilter, pagination.page]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params: any = {
        page: pagination.page,
        limit: 10 // Always use fixed limit
      };
      
      if (roleFilter !== 'all') params.role = roleFilter;
      if (statusFilter !== 'all') params.status = statusFilter;
      if (searchTerm) params.search = searchTerm;
      
      const response = await userService.getAll(params);
      setUsers(response.data);
      
      // Update pagination metadata from server
      if (response.metadata) {
        setPagination({
          page: response.metadata.page || 1,
          limit: response.metadata.limit || 10,
          total: response.metadata.total || 0,
          total_pages: response.metadata.total_pages || 1
        });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal mengambil data user');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPagination(prev => ({ 
      ...prev, 
      page: 1,
      total: 0,
      total_pages: 0
    }));
    fetchUsers();
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus user ini?')) {
      return;
    }

    try {
      await userService.delete(id);
      fetchUsers();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Gagal menghapus user');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Mobile Container - Centered */}
      <div className="max-w-md mx-auto min-h-screen bg-gray-100">
        {/* Content */}
        <div className="px-4 py-4">

          {error && <ErrorMessage message={error} />}

          {/* Filters - Hanya tampilkan untuk pengajar */}
          {currentUser?.role === 'pengajar' && (
            <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Cari
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Cari nama, email, atau NIS..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button onClick={handleSearch} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
                      Cari
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Role
                    </label>
                    <select
                      value={roleFilter}
                      onChange={(e) => {
                        setRoleFilter(e.target.value as any);
                        setPagination(prev => ({ 
                          ...prev, 
                          page: 1,
                          total: 0,
                          total_pages: 0
                        }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="all">Semua Role</option>
                      <option value="santri">Santri</option>
                      <option value="pengajar">Pengajar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Status
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) => {
                        setStatusFilter(e.target.value as any);
                        setPagination(prev => ({ 
                          ...prev, 
                          page: 1,
                          total: 0,
                          total_pages: 0
                        }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="all">Semua Status</option>
                      <option value="aktif">Aktif</option>
                      <option value="nonaktif">Non-Aktif</option>
                      <option value="alumni">Alumni</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User List */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {users.length === 0 ? (
              <div className="text-center py-12 px-4">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada data</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? 'Tidak ada hasil yang cocok dengan pencarian.' : 'Belum ada user yang terdaftar.'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {users.map((user) => (
                  <div key={user.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-700 font-bold text-lg">
                            {user.nama.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">{user.nama}</h3>
                            <p className="text-xs text-gray-600 truncate">{user.email}</p>
                            {user.nis && (
                              <p className="text-xs text-gray-500 mt-0.5">NIS: {user.nis}</p>
                            )}
                          </div>
                          
                          <div className="flex-shrink-0">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              user.status === 'aktif' 
                                ? 'bg-green-100 text-green-800' 
                                : user.status === 'alumni'
                                ? 'bg-gray-100 text-gray-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                            user.role === 'pengajar' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role === 'pengajar' ? 'Pengajar' : 'Santri'}
                          </span>
                          
                          {user.jenis_kelamin && (
                            <span className="text-xs text-gray-600">
                              {user.jenis_kelamin === 'laki-laki' ? '👨 Laki-laki' : '👩 Perempuan'}
                            </span>
                          )}
                        </div>
                        
                        {currentUser?.role === 'pengajar' && (
                          <div className="flex items-center gap-2 mt-3">
                            <Link
                              to={`/users/${user.id}`}
                              className="flex-1 text-center bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-colors"
                            >
                              Detail
                            </Link>
                            {currentUser.id !== user.id && (
                              <>
                                <Link
                                  to={`/users/${user.id}/edit`}
                                  className="flex-1 text-center bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-200 transition-colors"
                                >
                                  Edit
                                </Link>
                                <button
                                  onClick={() => handleDelete(user.id)}
                                  className="flex-1 text-center bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-200 transition-colors"
                                >
                                  Hapus
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination - Hanya untuk Pengajar */}
          {currentUser?.role === 'pengajar' && pagination.total_pages > 1 && (
            <div className="bg-white rounded-2xl shadow-sm p-4 mt-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs text-gray-700">
                  <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> - 
                  <span className="font-medium ml-1">
                    {Math.min(pagination.page * pagination.limit, pagination.total)}
                  </span> dari{' '}
                  <span className="font-medium">{pagination.total}</span>
                </div>
              </div>
              
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  ← Prev
                </button>
                
                <div className="flex gap-1">
                  {[...Array(Math.min(5, pagination.total_pages))].map((_, idx) => {
                    let page;
                    if (pagination.total_pages <= 5) {
                      page = idx + 1;
                    } else if (pagination.page <= 3) {
                      page = idx + 1;
                    } else if (pagination.page >= pagination.total_pages - 2) {
                      page = pagination.total_pages - 4 + idx;
                    } else {
                      page = pagination.page - 2 + idx;
                    }
                    
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          page === pagination.page
                            ? 'bg-green-600 text-white'
                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.total_pages}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Summary */}
          {users.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-4 mt-4">
              <div className="flex justify-between items-center text-xs text-gray-600">
                <span>Di halaman: <strong className="text-gray-900">{users.length}</strong></span>
                {currentUser?.role === 'pengajar' && (
                  <span>
                    Total: <strong className="text-gray-900">{pagination.total}</strong>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
};

export default UserList;
