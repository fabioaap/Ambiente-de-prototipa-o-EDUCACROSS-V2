#!/usr/bin/env python3
"""
Test script for Sprint 3 Auto Executor - validates logic without GitHub API calls
"""

import sys
import os

# Import from same directory
sys.path.insert(0, os.path.dirname(__file__))

try:
    from sprint3_auto_executor import Issue, IssueExecutor
except ImportError as e:
    print(f"Error importing sprint3_auto_executor: {e}")
    print("Make sure sprint3_auto_executor.py is in the same directory")
    sys.exit(1)

# Mock minimal GitHub response
class MockIssue:
    def __init__(self, number, title, body, labels):
        from sprint3_auto_executor import Issue
        self.issue = Issue(number, title, body, labels)
    
    def test_dependencies(self):
        return self.issue.dependencies

def test_dependency_detection():
    """Test explicit and heuristic dependency detection"""
    
    # Test 1: Explicit "depende de"
    issue1 = MockIssue(102, "Atualizar Storybook", "depende de #101", [])
    assert 101 in issue1.test_dependencies(), "Failed: explicit 'depende de' pattern"
    print("✓ Test 1 passed: Explicit 'depende de' pattern")
    
    # Test 2: "blocked by"
    issue2 = MockIssue(103, "Dashboard API", "blocked by #101 e #102", [])
    assert 101 in issue2.test_dependencies(), "Failed: 'blocked by' pattern"
    assert 102 in issue2.test_dependencies(), "Failed: 'blocked by' pattern (multiple)"
    print("✓ Test 2 passed: 'blocked by' pattern")
    
    # Test 3: Label "blocked"
    issue3 = MockIssue(200, "Old issue", "substituída por #104 e #105", ["blocked"])
    assert 104 in issue3.test_dependencies(), "Failed: label 'blocked' with refs"
    assert 105 in issue3.test_dependencies(), "Failed: label 'blocked' with refs (multiple)"
    print("✓ Test 3 passed: Label 'blocked' with references")
    
    # Test 4: Dashboard API heuristic
    issue4 = MockIssue(103, "Dashboard API", "Implementar API com #101 como base", [])
    assert 101 in issue4.test_dependencies(), "Failed: Dashboard API heuristic"
    print("✓ Test 4 passed: Dashboard API heuristic")
    
    # Test 5: Game Hub + Leaderboard heuristic
    issue5 = MockIssue(105, "Game Hub", "precisa do componente Leaderboard (#106)", [])
    assert 106 in issue5.test_dependencies(), "Failed: Game Hub Leaderboard heuristic"
    print("✓ Test 5 passed: Game Hub Leaderboard heuristic")
    
    # Test 6: No dependencies
    issue6 = MockIssue(101, "Configurar Pipeline CI", "Setup básico de CI/CD", [])
    assert len(issue6.test_dependencies()) == 0, "Failed: should have no dependencies"
    print("✓ Test 6 passed: No dependencies detected")
    
    print("\n✅ All dependency detection tests passed!")

def test_topological_sort():
    """Test topological sort with mock issues"""
    
    # Create mock executor (won't call API)
    class MockClient:
        pass
    
    executor = IssueExecutor(MockClient(), dry_run=True)
    
    # Add mock issues
    executor.issues = {
        101: Issue(101, "CI Setup", "", []),
        102: Issue(102, "Storybook", "depende de #101", []),
        103: Issue(103, "Dashboard API", "blocked by #101 e #102", []),
        106: Issue(106, "Leaderboard", "", []),
        104: Issue(104, "Dashboard UI", "requires API #103", []),
        105: Issue(105, "Game Hub", "Leaderboard (#106)", []),
    }
    
    # Re-infer dependencies
    for issue in executor.issues.values():
        issue.infer_dependencies()
    
    # Test topological order
    try:
        order = executor.topological_order()
        print(f"\n✓ Topological sort succeeded: {order}")
        
        # Validate order
        assert order.index(101) < order.index(102), "101 should come before 102"
        assert order.index(101) < order.index(103), "101 should come before 103"
        assert order.index(102) < order.index(103), "102 should come before 103"
        assert order.index(106) < order.index(105), "106 should come before 105"
        
        print("✅ Topological order is correct!")
        print(f"   Execution order: {order}")
        
        return True
    except RuntimeError as e:
        print(f"❌ Topological sort failed: {e}")
        return False

if __name__ == "__main__":
    print("=" * 80)
    print("Sprint 3 Auto Executor - Unit Tests")
    print("=" * 80)
    print()
    
    try:
        test_dependency_detection()
        test_topological_sort()
        print("\n" + "=" * 80)
        print("✅ ALL TESTS PASSED")
        print("=" * 80)
        sys.exit(0)
    except AssertionError as e:
        print(f"\n❌ TEST FAILED: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ UNEXPECTED ERROR: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
