import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";
import { getSubmissions, downloadCSV, FormData } from "@/lib/storage";
import { Download, ArrowLeft, Users, Target, Building2, RefreshCw } from "lucide-react";

const Admin = () => {
  const [submissions, setSubmissions] = useState<FormData[]>([]);
  const [filter, setFilter] = useState<'all' | 'batsman' | 'bowler' | 'academy'>('all');

  const loadSubmissions = () => {
    setSubmissions(getSubmissions());
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const filteredSubmissions = filter === 'all' 
    ? submissions 
    : submissions.filter(s => s.type === filter);

  const stats = {
    total: submissions.length,
    batsmen: submissions.filter(s => s.type === 'batsman').length,
    bowlers: submissions.filter(s => s.type === 'bowler').length,
    academies: submissions.filter(s => s.type === 'academy').length,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <section className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <Logo />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={loadSubmissions}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={downloadCSV} disabled={submissions.length === 0}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-6">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div 
            className={`card-elevated p-4 cursor-pointer transition-all ${filter === 'all' ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setFilter('all')}
          >
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-3xl font-bold text-foreground">{stats.total}</p>
          </div>
          <div 
            className={`card-elevated p-4 cursor-pointer transition-all ${filter === 'batsman' ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setFilter('batsman')}
          >
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Batsmen</p>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.batsmen}</p>
          </div>
          <div 
            className={`card-elevated p-4 cursor-pointer transition-all ${filter === 'bowler' ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setFilter('bowler')}
          >
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Bowlers</p>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.bowlers}</p>
          </div>
          <div 
            className={`card-elevated p-4 cursor-pointer transition-all ${filter === 'academy' ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setFilter('academy')}
          >
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Academies</p>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.academies}</p>
          </div>
        </div>

        {/* Submissions list */}
        <div className="card-elevated overflow-hidden">
          {filteredSubmissions.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              No submissions yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-foreground">Type</th>
                    <th className="text-left p-4 font-semibold text-foreground">Name</th>
                    <th className="text-left p-4 font-semibold text-foreground">City/Location</th>
                    <th className="text-left p-4 font-semibold text-foreground">Contact</th>
                    <th className="text-left p-4 font-semibold text-foreground">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map((submission, idx) => (
                    <tr key={idx} className="border-t border-border">
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          submission.type === 'batsman' ? 'bg-blue-100 text-blue-800' :
                          submission.type === 'bowler' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {submission.type === 'batsman' && <Users className="w-3 h-3" />}
                          {submission.type === 'bowler' && <Target className="w-3 h-3" />}
                          {submission.type === 'academy' && <Building2 className="w-3 h-3" />}
                          {submission.type}
                        </span>
                      </td>
                      <td className="p-4 text-foreground">
                        {submission.type === 'academy' 
                          ? (submission as any).academyName 
                          : (submission as any).name}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {submission.type === 'academy' 
                          ? (submission as any).location 
                          : (submission as any).city}
                      </td>
                      <td className="p-4 text-muted-foreground font-mono text-sm">
                        {submission.type === 'academy' 
                          ? (submission as any).contactPhone 
                          : (submission as any).whatsapp}
                      </td>
                      <td className="p-4 text-muted-foreground text-sm">
                        {formatDate(submission.submittedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Admin;
